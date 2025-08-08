import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@repositories/application/application';
import { Application } from '@entities/application.entity';
import { Event } from '@entities/event.entity';
import { App } from 'supertest/types';

@Injectable()
export class DashboardService {
    constructor(
        private readonly applicationService: ApplicationService,
    ) {}

    async onExecuteLastEvent() {
        let applicationListData: { [key: string]: any[] } = {};
        const applicationList: Application[] | [] = await this.applicationService.findAll();

        applicationList.forEach((app: Application) => {
            if (!app.type) return; 
            if (!applicationListData[app.type]) {
                applicationListData[app.type] = [];
            }
            applicationListData[app.type].push({
                name: app.name,
                updatedAt: app.updated_at,
                events: this.getLastEvent(app.events ?? [])
            });
        });
        
        return applicationListData;
    }

    async onExecuteAvgEvents() {
        let generalInfo: any = {};
        let applicationListData: any[] = []
        const applicationList: Application[] | [] = await this.applicationService.findAll();

        applicationList.forEach((app: Application) => {
            applicationListData.push({
                name: app.name,
                updated_at: app.updated_at,
                percentage: this.getAvgStatusEvents(app.events ?? [])
            });
        });

        const totalApplicationListData = {
            ...this.getAvgGeneralInfos(applicationList),
            applications: applicationListData
        }

        return totalApplicationListData;
    }

    getLastEvent(events: Event[]) {
        if(events.length) {
            return events.sort((a: Event, b: Event) => 
                new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
            )[0];
        }
    }

    getAvgStatusEvents(events: Event[]) {
        if(events.length) {
            const totalEvents = events.length;
            const upEvents = events.filter(event => event.status === 'up').length;
            const avgUp = (upEvents / totalEvents) * 100;

            return avgUp.toFixed(2);
        }
    }

    getAvgGeneralInfos(apps: Application[]) {
        if(apps.length) {
            const totalEvents = apps.reduce((acc, app) => acc + (app.events?.length ?? 0), 0);
            const upEvents = apps.reduce((acc, app) => acc + (app.events?.filter(event => event.status === 'up').length ?? 0), 0);
            const avgUp = (upEvents / totalEvents) * 100;

            return {
                servicos: apps.length,
                percentage: avgUp.toFixed(2)
            }
        }
    }

}
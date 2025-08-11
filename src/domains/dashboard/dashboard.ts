import { Injectable } from '@nestjs/common';
import { ApplicationService } from '@repositories/application/application';
import { Application } from '@entities/application.entity';
import { Event } from '@entities/event.entity';

@Injectable()
export class DashboardService {
    constructor(
        private readonly applicationService: ApplicationService,
    ) {}

    async onExecuteLastEvent() {
        let applicationListData: { [key: string]: any[] } = { internal: [], external: [] };
        const applicationList: Application[] | [] = await this.applicationService.findAll();
        applicationList.forEach((app: Application) => {
            if (!app.type) return; 
            if (!applicationListData[app.type]) {
                applicationListData[app.type] = [];
            }
            if(app.events?.length) {
                applicationListData[app.type].push({
                    name: app.name,
                    updated_at: app.updated_at,
                    events: this.getLastEvents(app.events ?? [])
                });
            }
        });
        
        return applicationListData;
    }

    async onExecuteAvgEvents() {
        let applicationListData: { [key: string]: any[] } = { internal: [], external: [] };
        const applicationList: Application[] | [] = await this.applicationService.findAll();

        applicationList.forEach((app: Application) => {
            if(app.events?.length) {
                if (!app.type) return; 
                applicationListData[app.type].push({
                    name: app.name,
                    updated_at: app.updated_at,
                    percentage: this.getAvgStatusEvents(app.events ?? []),
                    total_events: app.events.length,
                    events: app.events
                });
            }
        });

      
        const totalApplicationListData = {
            applications: applicationListData,
            infos:{
                internal: applicationListData.internal.length ? this.getAvgStatusApps(applicationListData.internal) : null,
                external: applicationListData.external.length ? this.getAvgStatusApps(applicationListData.external) : null
            }
        }

        return totalApplicationListData;
    }

    getLastEvents(events: Event[]) {
        if(events.length) {
            const hastDownEvent = events.some(event => event.status === 'down');

            if(hastDownEvent) {
                const lastDownEvent = events
                    .filter(event => event.status === 'down')
                    .sort((a, b) => {
                        const aTime = a.created_at ? a.created_at.getTime() : 0;
                        const bTime = b.created_at ? b.created_at.getTime() : 0;
                        return bTime - aTime;
                    })[0];
                return { status: 'down', created_at: lastDownEvent.created_at, description: lastDownEvent.description };
            }else {
                return { status: 'up' };
            }
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

    getAvgStatusApps(app: any[]) {
        let totalEvents = 0;
        let totalPercent = 0;

        app.forEach((app => {
            totalEvents += app.total_events;
            totalPercent += (app.percentage / 100) * app.total_events;
        }))

        return {
            totalServices: app.length,
            avgPercent: totalEvents ? ((totalPercent / totalEvents) * 100).toFixed(2) : '0.00'
        }
    }

}
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
                    events: this.getLastEvent(app.events ?? [])
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
                    total_events: app.events.length
                });
            }
        });

      
        const totalApplicationListData = {
            applications: applicationListData,
            infos:{
                internal: this.getAvgStatusApps(applicationListData.internal),
                external: this.getAvgStatusApps(applicationListData.external)
            }
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

    getAvgStatusApps(app: any[]) {
        let totalEvents = 0;
        let totalPercent = 0;

        app.forEach((app => {
            totalEvents += app.total_events;
            totalPercent += (app.percentage / 100) * app.total_events;
        }))

        return {
            totalEvents,
            avgPercent: totalEvents ? ((totalPercent / totalEvents) * 100).toFixed(2) : '0.00'
        }
    }

}
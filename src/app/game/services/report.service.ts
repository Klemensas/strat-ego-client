import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SocketService } from './socket.service';

@Injectable()
export class ReportService {
  public reports = new BehaviorSubject(null);
  private _reports = [];
  private playerId = null;

  constructor(private socket: SocketService) {
  }

  observeReports() {
    this.socket.events.get('reports').subscribe(report => {
      const formattedReports = this.formatReport(report);
      this._reports.push(formattedReports);
      this.reports.next(this._reports);
    });
    return this.reports;
  }

  setPlayer(playerId) {
    this.playerId = playerId;
  }

  updateReports(...reports) {
    const formattedReports = reports
      .map(report => this.formatReport(report))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    this._reports = formattedReports;
    this.reports.next(formattedReports);
  }

  private formatReport(report) {
    const type = report.ReportDestinationPlayerId === this.playerId ? 'defense' : 'attack';
    const result = report.outcome === 'attack' && type === 'attack' ? 'win' : 'lose';

    return {
      ...report,
      type,
      result,
    }
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSwDataService {
  user: any = null;
  dbPromises: any = {};
  dbName = null;
  usedStoragePercent:number = 0;
  totalAvailableStorage:number = 0;
  utilisedStorage:number = 0;
  totalInspectionToSync = 0;
  currentSyncingInspection = 0;
  offlineStatusMessage = null;
  showVersion = false;
  canDeactivateState = true;
  fromDashboardStart = false;
  componentCanDeactivateState = false;
  inspectionFilterParameters = {"InspectionId":0};
  followUpFilterParameters = {"FollowUpId":0};
  activeParentId = parseInt(localStorage.getItem('activeParentId') || '0');
  constructor() {
  }
}

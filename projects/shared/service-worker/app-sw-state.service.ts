import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSwStateService {

  hasDataForSync = false;
  isDataFromCache = false;
  isOffline = false;
  isInSyncing = false;
  isUserSet = false;
  isWalshAdmin = false;
  isWalshEmail = false;
  isAccountGroupAdmin = false;
  isAccountAdmin = false;
  isManager = false;
  isOperator = false;
  isInspector = false;
  isExecutingInspection = false;
  isInspectionCoverPage = false;
  isQuotaExceeded = false;
  constructor() { }

}

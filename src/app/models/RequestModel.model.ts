import { Injectable } from '@angular/core';
import {Request} from "../models/request.model";
export interface RequestModel {
  userEmail: string | undefined;
  adminEmail: string;
  request: Request | undefined;
}

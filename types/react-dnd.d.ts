import { Ref } from 'react';

declare module 'react-dnd' {
  export interface ConnectDragSource {
    (element: any): any;
  }
}
export class OrderHistory {
    constructor(public id:number,
        public orderTrackingName:string,
        public totalPrice:number,
        public totalQuantity:number,
        public createdDate:Date
        ){}
      }

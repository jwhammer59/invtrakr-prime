export class Item {
  id?: string;
  itemOwner: string = '';
  itemName: string = '';
  itemDesc: string = '';
  itemMfg: string = '';
  itemModelNum: string = '';
  itemSerialNum: string = '';
  itemQty: number = 0;
  itemExtWarranty: boolean = false;
  itemPurchaseDate: string = '';
  itemPurchasePrice: string = '';
  itemVendor: string = '';
  itemPaymentType: string = '';
  itemDwelling: { dwellingName: string; dwellingCity: string } = {
    dwellingName: '',
    dwellingCity: '',
  };
  itemRoom: { roomName: string; roomLevel: string } = {
    roomName: '',
    roomLevel: '',
  };
}

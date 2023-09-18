import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/app/global';
@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private httpClient: HttpClient, private global: Global) { }

  saveShippingType(type) {
    let data = {
      MasterSettings: 'Shipping',
      CurrentSelection: type,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddMasterSettingsSelections', data, httpOptions);
  }

  getSelectedShippingType() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetShippingType', httpOptions);
  }

  SaveShippingDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddShippingDetails', data, httpOptions);
  }

  GetShippingDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetShippingDetails/' + data, httpOptions);
  }

  SaveRateByPriceDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddratebyPrice', data, httpOptions);
  }

  GetWeightDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetRatebyWeightAndPriceDetails?type=' + data, httpOptions);
  }

  addCarrierDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddCarrier', data, httpOptions);
  }

  GetCarrierDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetCarrierDetails', httpOptions);
  }

  CreateShiprocketOrder(sampleData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/CreateOrder', sampleData, httpOptions);
  }

  GetShippingCourierService(pickup_postcode, delivery_postcode, weight, order_id, cod) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + 6 + '/GetCourierServiceability/?pickup_postcode=' + pickup_postcode + "&delivery_postcode=" + delivery_postcode + "&weight=" + weight + "&order_id=" + order_id + "&cod=" + cod, httpOptions);
  }

  GenerateManifest(shipment_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GenerateManifest/?shipment_id=' + shipment_id, httpOptions);
  }

  PrintManifest(order_ids) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/PrintManifest/?order_ids=' + order_ids, httpOptions);
  }

  GenerateLabel(shipment_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GenerateLabel/?shipment_id=' + shipment_id, httpOptions);
  }

  GenerateInvoice(ids) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GenerateInvoice/?ids=' + ids, httpOptions);
  }

  GetWalletBalance() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetWalletBalance/', httpOptions);
  }

  getApiUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetShiprocketApiUser/', httpOptions);
  }

  addApiUser(userData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    let data: any = {
      Email: userData.Username,
      Password: userData.Password
    }
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddShiprocketApiUser', data, httpOptions);
  }

  updateApiUser(userData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    let data: any = {
      Email: userData.Username,
      Password: userData.Password
    }
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateShiprocketApiUser', data, httpOptions);
  }

  getShipmentDetails(orderId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetShipmentID/' + orderId, httpOptions);
  }

  getTrackingDetails(shipmentId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetTrackingDetails/' + shipmentId, httpOptions);
  }

  GetPickupLocations() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetAllPickupLocations/', httpOptions);
  }

  changeDeliveredStatus(orderId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/ChangeDeliveredStatus/' + orderId, httpOptions);
  }

  getTrackingByShipmentID(ShipmentID: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetTrackingByShipmentID/' + ShipmentID, httpOptions);
  }

}
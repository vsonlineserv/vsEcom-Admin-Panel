export class AddLicensePlan {
    productName: string;
    planName: string;
    licenseType: string;
    validityInDays: string;
    allowedActivations: string;
    maxAllowedSize: string;
}

export class EditLicenseDetail {
    applicationName: string;
    identifiers: string;
    licenseEndDate: string;
    numberOfLicense: string;
    maxAllowedSize: string;
    licenseplan: string;
    licenseEndDateExtended: string;
    active: string;
    pause: string;
    suspend: string;
    pauseEndDate: string;
}

export class LicenseDetail {
    
}
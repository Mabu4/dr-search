
export class Doc {
    firstName: string;
    lastName: string;
    title: string;
    specialities: any;
    themes: any;
    insurance: string;
    note: number;
    ratings: number;
    street: string;
    zipCode: number;
    city: string;
    phone: number;
    img: string;
    mondayFrom: any;
    mondayTo: any;
    tuesdayFrom: any;
    tuesdayTo: any;
    wednesdayFrom: any;
    wednesdayTo: any;
    thursdayFrom: any;
    thursdayTo: any;
    fridayFrom: any;
    fridayTo: any;
    appointment: any;
    

    constructor(obj?: any){
        //this.firstName = wenn objekt vorhanden obj.firstName und wenn nicht dann leerer String
        this.firstName = obj ? obj.firstName: '';
        this.lastName = obj ? obj.lastName: '';
        this.title = obj ? obj.title: '';
        this.specialities = obj ? obj.specialities: [];
        this.themes = obj ? obj.themes: [];
        this.insurance = obj ? obj.insurance: '';
        this.note = obj ? obj.note: '';
        this.ratings = obj ? obj.ratings: '';
        this.street = obj ? obj.street: '';
        this.zipCode = obj ? obj.zipCode: '';
        this.city = obj ? obj.city: '';
        this.phone = obj ? obj.phone: '';
        this.img = obj ? obj.img: '';
        this.mondayFrom = obj ? obj.mondayFrom: '';
        this.mondayTo = obj ? obj.mondayTo: '';
        this.tuesdayFrom = obj ? obj.tuesdayFrom: '';
        this.tuesdayTo = obj ? obj.tuesdayTo: '';
        this.wednesdayFrom = obj ? obj.wednesdayFrom: '';
        this.wednesdayTo = obj ? obj.wednesdayTo: '';
        this.thursdayFrom = obj ? obj.thursdayFrom: '';
        this.thursdayTo = obj ? obj.thursdayTo: '';
        this.fridayFrom = obj ? obj.fridayFrom: '';
        this.fridayTo = obj ? obj.fridayTo: '';
        this.appointment = obj ? obj.appointment: '';
    }

    public toJSON(){
        return{
            firstName: this.firstName,
            lastName: this.lastName,
            title: this.title,
            specialities: this.specialities,
            themes: this.themes,
            insurance: this.insurance,
            note: this.note,
            ratings: this.ratings,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            phone: this.phone,
            img: this.img,
            mondayFrom: this.mondayFrom,
            mondayTo: this.mondayTo,
            tuesdayFrom: this.tuesdayFrom,
            tuesdayTo: this.tuesdayTo,
            wednesdayFrom: this.wednesdayFrom,
            wednesdayTo: this.wednesdayTo,
            thursdayFrom: this.thursdayFrom,
            thursdayTo: this.thursdayTo,
            fridayFrom: this.fridayFrom,
            fridayTo: this.fridayTo,
            appointment: this.appointment
        }
    }
}
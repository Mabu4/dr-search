
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
            img: this.img
        }
    }
}
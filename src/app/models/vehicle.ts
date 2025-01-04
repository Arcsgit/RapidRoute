export class Vehicle {
    private vehicleId: number;
    private vehicleLocation: number;

    private static id: number = 0;
    private static generateId(): number { return ++Vehicle.id; }

    constructor(location:  number) {
        this.vehicleId = Vehicle.generateId();
        this.vehicleLocation = location;
    }
    public getVehicleId(): number { return this.vehicleId; }
    public getVehicleLocation(): number { return this.vehicleLocation; }
}

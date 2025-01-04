import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Store } from "./store";
import { Vehicle } from "./vehicle";

interface Path {
    nodes: number[];
    totalDistance: number;
}

interface Result {
    nodes: number[];
    totalDistance: number;
    store: number;
}

export class DeliveryManagement {
    public orders: Order[] = [];
    public stores: Store[] = [];
    public vehicles: Vehicle[] = [];

    private adjacencyMatrix: number[][];
    private mainNode: number = 0;
    private numNodes: number;
    constructor(nodes: number, startNode: number) {
        console.log("dm construtor");
        this.numNodes = nodes;
        this.mainNode = startNode;
        this.adjacencyMatrix = Array(nodes).fill(0).map(() => Array(nodes).fill(0));
        this.addPath(0, 1, 2.5);
        this.addPath(1, 2, 1.8);
        this.addPath(2, 3, 3.0);
        this.addPath(1, 4, 2.0);
        this.addPath(4, 3, 1.5);
        this.addPath(0, 5, 4.0);
        this.addPath(5, 3, 2.2);
    }

    public addOrder(newOrder: Order): Result|null {
        var items: OrderItem[] = [];
        if(newOrder.getOrderItems)
            items = newOrder.getOrderItems();
        let destination: number = newOrder.destination;
        let validStores: Store[] = [];
        var itemsCount: number = items.length;

        // console.log("dm inside : ");
        // console.log(this.stores);
        // console.log(this.vehicles);

        // Finding all stores having all items
        for(let store of this.stores) {
            itemsCount = items.length;
            for(let item of items) {
                for(let storeitem of store.getStoreItems()) {
                    if(storeitem.getItemId() == item.getItemId() && storeitem.getQty() >= item.getQty()) 
                        itemsCount--;
                    if(itemsCount==0) 
                        break;
                }
                if(itemsCount == 0)
                    validStores.push(store);
                if(itemsCount == 0 || itemsCount === items.length) 
                    break;
            }
        }
        if(itemsCount==0 || validStores.length!=0)
            validStores = Array.from(new Set(validStores));
        else {
            console.log("Items not found in stores");
            return null;
        }
        // console.log(validStores);

        // Finding shortest store from destination
        const sortedStores = this.sortStoresByDistance(validStores, destination);
        // newOrder.setStore(sortedStores[0]);
        // console.log(sortedStores);

        // const result = this.findNearestVehiclePathToStore(this.vehicles, sortedStores[0]);
        // console.log(result);

        let bestPath: Path = {
            nodes: [],
            totalDistance: Number.MAX_VALUE
        };
        let bestStore: number = -1;

        for(let i=0; i<sortedStores.length; i++) {
            let toStore: Path = this.dijkstra2(this.mainNode, sortedStores[i].getStoreID());
            let toDestination: Path = this.dijkstra2(sortedStores[i].getStoreID(), destination);
            let totalDistance: number = toStore.totalDistance + toDestination.totalDistance;

            if (totalDistance < bestPath.totalDistance) {
                bestPath.totalDistance = totalDistance;
                bestStore = sortedStores[i].getStoreID();
                bestPath.nodes = toStore.nodes;
                bestPath.nodes = bestPath.nodes.concat(toDestination.nodes.slice(1));
            }
        }

        // console.log(`Total distance: ${bestPath.totalDistance.toFixed(1)} km`);
        // console.log(`Path: ${bestPath.nodes.join(' -> ')}`);
        // console.log(`Item pickup at store: ${bestStore}`);

        let res: Result = {
            nodes: bestPath.nodes,
            totalDistance: bestPath.totalDistance,
            store: bestStore
        };
        return res;
    }

    public addStore(name:string, location: number, itemsCount: number): void {
        this.stores.push(new Store(name, location, itemsCount));
    }

    public addVehicle(location: number): void {
        this.vehicles.push(new Vehicle(location));
    }


    private addPath(from: number, to: number, distance: number): void {
        this.adjacencyMatrix[from][to] = distance;
        this.adjacencyMatrix[to][from] = distance;
    }
    
    private findPath(source: number, destination: number): Path {
        const distances = this.dijkstra(source);
        const path: Path = {
            nodes: [source],
            totalDistance: distances[destination]
        };

        let current = source;
        while (current !== destination) {
            let nextNode = -1;
            let minRemainingDist = Number.MAX_VALUE;

            for (let i = 0; i < this.numNodes; i++) {
                if (this.adjacencyMatrix[current][i] !== 0) {
                    const distThroughThis = distances[destination] - distances[current];
                    if (distThroughThis < minRemainingDist) {
                        minRemainingDist = distThroughThis;
                        nextNode = i;
                    }
                }
            }

            if (nextNode === -1) 
                break;
            path.nodes.push(nextNode);
            current = nextNode;
        }

        return path;
    }
    private findNearestVehiclePathToStore(vehicles: Vehicle[], store: Store): { vehicleId: number|undefined, path: Path } {
        let bestVehicleId;
        let bestPath: Path = {
            nodes: [],
            totalDistance: Number.MAX_VALUE
        };

        for (const vehicle of vehicles) {
            const currentPath = this.findPath(vehicle.getVehicleLocation(), store.getStoreLocation());
            
            if (currentPath.totalDistance < bestPath.totalDistance) {
                bestPath = currentPath;
                bestVehicleId = vehicle.getVehicleId();
            }
        }

        return { vehicleId: bestVehicleId, path: bestPath };
    }

    sortStoresByDistance(stores: Store[], fromLocation: number): Store[] {
        // Get all shortest distances from the given location
        const distances = this.dijkstra(fromLocation);

        // Create array of stores with their distances
        const storesWithDistances = stores.map(store => ({
            store,
            distance: distances[store.getStoreLocation()]
        }));

        // Sort by distance
        storesWithDistances.sort((a, b) => a.distance - b.distance);

        // Return sorted stores
        return storesWithDistances.map(item => item.store);
    }

    private dijkstra(source: number): number[] {
        const distances: number[] = Array(this.numNodes).fill(Number.MAX_VALUE);
        const visited: boolean[] = Array(this.numNodes).fill(false);
        
        distances[source] = 0;

        for(let i = 0; i < this.numNodes - 1; i++) {
            // Find minimum distance vertex from unvisited vertices
            let minDistance = Number.MAX_VALUE;
            let minIndex = -1;

            for (let j = 0; j < this.numNodes; j++) {
                if(!visited[j] && distances[j] < minDistance) 
                {
                    minDistance = distances[j];
                    minIndex = j;
                }
            }

            if (minIndex === -1) 
                break;

            // Mark picked vertex as visited
            visited[minIndex] = true;

            // Update distances of adjacent vertices
            for(let j = 0; j < this.numNodes; j++) {
                if(!visited[j] && 
                    this.adjacencyMatrix[minIndex][j] !== 0 && 
                    distances[minIndex] !== Number.MAX_VALUE && 
                    distances[minIndex] + this.adjacencyMatrix[minIndex][j] < distances[j]
                )
                    distances[j] = distances[minIndex] + this.adjacencyMatrix[minIndex][j];
            }
        }
        return distances;
    }

    private dijkstra2(start: number, end: number): Path {
        const distance: number[] = new Array(this.numNodes).fill(Number.MAX_VALUE);
        const previous: number[] = new Array(this.numNodes).fill(-1);
        const visited: boolean[] = new Array(this.numNodes).fill(false);
        
        distance[start] = 0;
        
        for (let i = 0; i < this.numNodes; i++) {
            let minDist: number = Number.MAX_VALUE;
            let current: number = -1;
            
            // Find unvisited node with minimum distance
            for (let j = 0; j < this.numNodes; j++) {
                if (!visited[j] && distance[j] < minDist) {
                    minDist = distance[j];
                    current = j;
                }
            }
            
            if (current === -1) {
                break;
            }
            
            visited[current] = true;
            
            // Update distances to neighboring nodes using weights
            for (let j = 0; j < this.numNodes; j++) {
                if (this.adjacencyMatrix[current][j] > 0) {
                    const newDist: number = distance[current] + this.adjacencyMatrix[current][j];
                    if (newDist < distance[j]) {
                        distance[j] = newDist;
                        previous[j] = current;
                    }
                }
            }
        }
        
        const result: Path = {
            nodes: [],
            totalDistance: distance[end]
        };
        
        let current: number = end;
        while (current !== -1) {
            result.nodes.unshift(current);
            current = previous[current];
        }
        
        return result;
    }
    
}

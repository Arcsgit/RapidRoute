import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Store } from "./store";
import { Vehicle } from "./vehicle";

interface Path {
    nodes: number[];
    totalDistance: number;
}

export class DeliveryManagement {
    public orders: Order[] = [];
    public stores: Store[] = [];
    public vehicles: Vehicle[] = [];

    private adjacencyMatrix: number[][];
    private mainNode: number;
    private numNodes: number;

    constructor(numNodes: number, mainNode: number) {
        this.numNodes = numNodes;
        this.mainNode = mainNode;
        this.adjacencyMatrix = Array(numNodes).fill(0).map(() => Array(numNodes).fill(0));
        this.addPath(0, 4, 6.2);
        this.addPath(0, 2, 7.1);
        this.addPath(0, 6, 5.3);
        this.addPath(1, 2, 3.5);
        this.addPath(1, 7, 5.1);
        this.addPath(2, 4, 3.7);
        this.addPath(3, 5, 2.4);
        this.addPath(3, 4, 1.3);
        this.addPath(6, 7, 5.7);
        this.addPath(5, 6, 3.5);
        
    }

    public addOrder(newOrder: Order): Order|null {
        var items: OrderItem[] = newOrder?.getOrderItems();
        let destination: number = newOrder.getDestination();
        let validStores: Store[] = [];
        var itemsCount: number = items.length;
        
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
            newOrder.setStatus(0);
            this.orders.push(newOrder);
            return null;
        }

        // Finding shortest store from destination
        const sortedStores = this.sortStoresByDistance(validStores, destination);
        newOrder.setStore(sortedStores[0]);

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
        
        newOrder.setPath(bestPath);
        newOrder.setStatus(1);
        this.orders.push(newOrder);
        return newOrder;
    }

    public addStore(newStore: Store): void {
        this.stores.push(newStore);
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

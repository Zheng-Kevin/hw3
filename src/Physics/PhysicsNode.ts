import Collider from "./Colliders/Collider";
import GameNode from "../Nodes/GameNode";
import PhysicsManager from "./PhysicsManager";
import Vec2 from "../DataTypes/Vec2";

export default abstract class PhysicsNode extends GameNode {

    protected collider: Collider = null;
    protected children: Array<GameNode>;
    private manager: PhysicsManager;
    isMoving: boolean;
    protected isGrounded: boolean;

    constructor(){
        super();
        this.children = new Array();
        this.isMoving = false;
    }

    setIsGrounded(isGrounded: boolean): void {
        this.isGrounded = isGrounded;
    }

    addManager(manager: PhysicsManager): void {
        this.manager = manager;
    }

    isCollidable(): boolean {
        return this.collider !== null;
    }

    getCollider(): Collider {
        return this.collider;
    }

    move(velocity: Vec2): void {
        this.isMoving = true;
        this.manager.addMovement(this, velocity);
    }

    finishMove(velocity: Vec2): void {
        this.position.add(velocity);
        this.collider.getPosition().add(velocity);
        for(let child of this.children){
            child.getPosition().add(velocity);
        }
    }

    abstract create(): void;
}
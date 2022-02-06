import Gun from "gun";

export default Gun({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});

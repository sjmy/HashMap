import HashMap from "./HashMap.js";

let test = HashMap();

test.set("Salmon", "Mynott");
test.set("Salmon", "Belly");

console.table(test.buckets);

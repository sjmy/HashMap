import HashMap from "./HashMap.js";

let test = HashMap();

test.set("Salmon", "Mynott");
test.set("Booby", "Trap");
test.set("Vancouver", "Canucks");
test.set("Toronto", "Blue Jays");
test.set("Abbotsford", "Canucks");
test.set("Deltron", "3030");

console.table(test.buckets);

console.table(test.has("Vancouver"));

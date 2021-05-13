# Project: A Robot

```js
//小镇道路数据
const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];
//将小镇道路数据变更为可操作对象
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
// const roadGraph = {
// "Alice's House": [ "Bob's House", 'Cabin', 'Post Office' ],
// "Bob's House": [ "Alice's House", 'Town Hall' ],
// "Cabin": [ "Alice's House" ],
// "Post Office": [ "Alice's House", 'Marketplace' ],
// "Town Hall": [ "Bob's House", "Daria's House", 'Marketplace', 'Shop' ],
// "Daria's House": [ "Ernie's House", 'Town Hall' ],
// "Ernie's House": [ "Daria's House", "Grete's House" ],
// "Grete's House": [ "Ernie's House", 'Farm', 'Shop' ],
// "Farm": [ "Grete's House", 'Marketplace' ],
// "Shop": [ "Grete's House", 'Marketplace', 'Town Hall' ],
// "Marketplace": [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ]
//}

const VillageState = class VillageState {
  //小镇状态初始化地点，包裹  
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  //机器人移动方法  
  move(destination) {
    //判断当前机器人的地址是否能通往目的地
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {   
      let parcels = this.parcels.map(p => {
        //判断初始化地点"Post Office"是否包含包裹 
        if (p.place != this.place) return p;
        //初始化地点"Post Office"包含包裹,返回包裹对象，"捡起包裹"
        //被捡起的包裹地址实时刷新为destination变量的值
        return {place: destination, address: p.address};
      // 过滤掉存入parcels中地址相等的对象，实现机器人送达效果
      }).filter(p => p.place != p.address);
      //未被过滤掉的包裹，重新传入新的小镇对象，实现更新小镇状态，包裹状态的效果，机器人状态  
      return new VillageState(destination, parcels);
    }
  }
}
//移动机器人接收小镇状态，机器人种类，机器内存，当小镇包裹为0时输出计数器
//根据机器人种类实时刷新移动路线，刷新机器内存
function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    //根据机器人类型执行相应的动作randomRobot随机选择路线
    //routeRobot走固定路线两圈
    //goalOrientedRobot  
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
//随机选择小镇地点
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
//随机机器人根据当前所在位置随机选择道路目的地移动
function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}
//生成随机小镇状态，包裹数量5以及5个所在位置和要去的目的地，机器人初始位置"Post Office"
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

// runRobot(VillageState.random(), randomRobot);
//给机器人设定邮局思路路线
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
//机器内存放邮局路线，每经过一次就删除一个地址
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1)
  };
}
//runRobot(VillageState.random(), routeRobot, []);
//寻路方法
function findRoute(graph, from, to) {
  //初始化work状态  
  let work = [{at: from,route: []}];
  for (let i = 0; i < work.length; i++) {
    //解构赋值  
    let {at,route} = work[i];
    //遍历当前机器人所能走的相邻路线  
    for (let place of graph[at]) {
      //判断相邻路线是否是目的地，是则放到work状态的route路线中 
      if (place == to) return route.concat(place);
      //如果相邻的道路没有包裹或不是包裹的目的地，则把相邻的路都走到，挨个判断下一个相邻地点
      //实现最短路径判断
      if (!work.some(w => w.at == place)) {
        work.push({at: place,route: route.concat(place)});
      }
    }
  }
}
//parcels包裹为数组，里面包含实时的所在地址和要去的目的地
function goalOrientedRobot({place,parcels}, route) {
  if (route.length == 0) {
    //拿出第一组包裹
    let parcel = parcels[0];
    //判断包裹当前地址是否为实时刷新状态，即"是否被捡起"
    if (parcel.place != place) {
    //未被捡起执行寻路去捡起包裹方法    
      route = findRoute(roadGraph, place, parcel.place);
    } else {
    //已被被捡起的包裹执行寻路方法送包裹去目的地
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {
    //刷新执行寻路方法后，机器人的当前实时位置地址  
    direction: route[0],
    //无论是去捡包裹，还是送包裹，执行完后当前位置地址对机器内存无意义，删除提高寻路效率  
    memory: route.slice(1)
  };
}
//runRobot(VillageState.random(), goalOrientedRobot, []);
```



## Exercises

### Measuring a robot

编写一个`compareRobots`需要两个机器人（及其起始内存）的函数。它应该生成100个任务，并让每个机器人解决这些任务。完成后，它应该输出每个机器人完成每个任务的平均步骤数。

为了公平起见，请确保将每个任务都分配给两个机械手，而不是为每个机械手生成不同的任务。

```js
function compareRobots(robot1, memory1, robot2, memory2) {
  //重写runRobot返回计数器  
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  let robot1Turn = [];
  let robot2Turn = [];
  //为公平起见随机100组工作量同时分给两个机器人  
  for (let n = 0; n < 100; n++) {
    const villageState = VillageState.random();
    robot1Turn.push(runRobot(villageState, robot1, memory1));
    robot2Turn.push(runRobot(villageState, robot2, memory2));
  }
  //求100次任务所需移动次数平均值  
  let compareRobot1 = robot1Turn.reduce((pre, cur) => {
    return pre += cur;
  }, 0) / 100;
  let compareRobot2 = robot2Turn.reduce((pre, cur) => {
    return pre += cur;
  }, 0) / 100;
  let winner = compareRobot1 > compareRobot2 ? "winner is Robot2" : "winner is Robot1";
  console.log(`The average number of steps robot1: "${compareRobot1}".\n
The average number of steps robot2: "${compareRobot2}".\n"${winner}"`);
};
compareRobots(routeRobot, [], goalOrientedRobot, []);
```

### Robot efficiency

编写出比`goalOrientedRobot`完成交付任务更快的机器人，使用`compareRobots`功能来验证。

`goalOrientedRobot`选择时总会优先选择`parcels[0]`,第一个包裹。

`efficiencyRobot`可以从选着包裹优先级上优化，收集所有包裹的路线，选最短的路线。如果有多个最短路线可以选着①优先去捡起包裹，②优先交付包裹，来效率优化。

```js
// 优先拾取机器人
function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),pickUp: false};
      }
    });
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }
  return {direction: route[0], memory: route.slice(1)};
}

// 优先派送机器人
function efficiencyRobot({place,parcels},route) {
  if(route.length == 0) {
    let routes = parcels.map(parcels => {
      if(parcel.place != place) {
        return {route: findRoute(roadGraph,place,parcel.place),pickUp: true};
      } else {
        return {route: findRoute(roadGraph,place,parcel.address),pickUp: false};
      }
    });
    function send({route,pickUp}) {
      return (pickUp ? 1 : 0) + route.length;
    }
    route = routes.reduce((a, b) => send(a) > send(b) ? b : a).route;
  }
  return {direction: route[0], memory: route.slice(1)};
};
compareRobots(efficiencyRobot, [], lazyRobot, []);
```

### Persistent group

编写一个新类PGroup，类似于第6章中的Group类，它存储一组值。和Group一样，它也有添加、删除和方法。它的add方法应该返回一个添加了给定成员的新PGroup实例，而保持旧的成员不变。类似地，delete创建一个没有给定成员的新实例。

```javascript
class PGroup {
  constructor(group) {
    this.group = group;
  }
  add(val) {
    return new PGroup(this.group.concat([val]));
  }
  delete(val) {
    if(!this.has(val)) return this;
    return new PGroup(this.group.filter(el => el != val));
  }
  has(val) {
    return this.group.includes(val);
  }
}
PGroup.empty = new PGroup([]);
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));
```


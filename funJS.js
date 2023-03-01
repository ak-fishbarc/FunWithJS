const players = []
const buildings = []

// Create functions.
function createPlayer(name)
{
  const player =
  {
    player_name: name,
    militia_count: 0,
    displayMilitiaCount: function()
    {
      document.getElementById("player_stats").innerHTML = `Militia Count: ${this.militia_count}`;
    }
  }
  return player;
};

function buildCastle(identity)
{
  const castle_building =
  {
    const_name: "Castle",
    identity: identity,
    hp: 1000,
    food: 10,
    wood: 20,
    stone: 50,
    gold: 100
  };
  return castle_building;
};

function buildFarm(identity)
{
  const farm_building =
  {
    const_name: "Farm",
    identity: identity,
    hp: 100,
    food: 5,
    wood: 15,
    stone: 5,
    gold: 10
  };
  return farm_building;
};

function createIdentity(const_name)
{
  return identity = const_name + buildings.length.toString();
};

player = createPlayer("Player1");
start_castle = buildCastle("start_castle");
start_farm = buildFarm("start_farm");

players.push(player);

buildings.push(start_castle);
buildings.push(start_farm);

function attachEvents(entity)
{
  document.getElementById(entity.identity).innerHTML = entity.const_name;
  document.getElementById(entity.identity).onclick = function() { showStats(entity, player); };
}

function checkPlace(entity)
{
  result = ""
  // Code for collision detection. Get borders of each object.
  es = entity.style
  for(i = 0; i < buildings.length ; i++)
  {
    // Currently only start objects use separate CSS file;
    // This is why style properties of those objects need this extra line of code.
    html_element = window.getComputedStyle(document.getElementById(buildings[i].identity))
    // Check for collision.
    // First is to check if the building is not colliding with sidebar.
    if(parseInt(es.left) < 125)
    {
      return "Red";
    }
    if(parseInt(es.left) + parseInt(es.width) < parseInt(html_element.left) ||
    parseInt(es.top) + parseInt(es.height) < parseInt(html_element.top) ||
    parseInt(html_element.left) + parseInt(html_element.width) < parseInt(es.left) ||
    parseInt(html_element.top) + parseInt(html_element.height) < parseInt(es.top))
    {
      result = "Green";
    }
    else
    {
      // If any of the buildings is in the way, stop and return red.
      return "Red";
    }
  }
  return result;
}
//////////////////////////////////////////////////////////////////////////////////
// Switch case is in putBuilding andd positionBuilding for now; Until I have time
// to write better solution.
//////////////////////////////////////////////////////////////////////////////////
function putBuilding(event, building, building_name)
{
  document.onmousemove = "";
  document.onclick = "";

  building.style.position = "fixed";
  switch(building_name)
  {
    case "castle":
    building.style.backgroundColor = "grey";
    new_building = buildCastle(building.id);
    break;

    case "farm":
    building.style.backgroundColor = "blue";
    new_building = buildFarm(building.id);
    break;
  }

  // Building refers to HTML element, new_building refers to JS const.
  document.body.appendChild(building);
  attachEvents(new_building);
  buildings.push(new_building);
}

function positionBuilding(event, building, building_name)
{
  switch(building_name)
  {
    case "castle":
    building.style.height = "100px";
    building.style.width = "80px";
    break;

    case "farm":
    building.style.height = "50px";
    building.style.width = "50px";
    break;
  }

  building.style.top = event.clientY + "px";
  building.style.left = event.clientX + "px";

  if(checkPlace(building) == "Green")
  {
    document.onclick = function(event) { putBuilding(event, building, building_name); };
  }
  else
  {
    document.onclick = "";
  }
  console.log(building_name);
  console.log(checkPlace(building));
}

function moveBuilding(event, entity, building, building_name)
{
  document.onmousemove = function(event) { positionBuilding(event, building, building_name); };
  entity.onmouseleave = "";
}
///////////////////////////////////////////////////////////////////////////////////
// Argument "entity" takes value of "construction" HTML element, to set and delete
// events related to this element.
// Argument "building_name" takes string to create Unique Identifier for the
// building. This should be related to the type of building: "castle" for castle,
// "farm" for farm etc. createIdentity will return, e.g. "castle2" as new id.
///////////////////////////////////////////////////////////////////////////////////
function createBuilding(event, entity, building_name)
{
  new_building = document.createElement("div");
  new_identity = createIdentity(building_name);
  new_building.id = new_identity;
  entity.onmouseleave = function(event) { moveBuilding(event, entity, new_building, building_name); };
}

function removeOptions(entity)
{
  construct_building = document.getElementById("construct_building");
  document.getElementById(entity.id).removeChild(construct_building);
  document.getElementById(entity.id).onclick = function() { constructionOptions(entity); };
}
// Building construction options
function constructionOptions(entity)
{
  construct_building = document.createElement("div");
  construct_building.id = "construct_building";

  document.getElementById(entity.id).appendChild(construct_building);
  document.getElementById(entity.id).onclick = function() { removeOptions(entity); };

  castle_icon = document.createElement("div");
  castle_icon.id = "castle_icon";

  document.getElementById("construct_building").appendChild(castle_icon);
  document.getElementById("castle_icon").onclick = function() { createBuilding(event, entity, "castle"); };

  farm_icon = document.createElement("div");
  farm_icon.id = "farm_icon";

  document.getElementById("construct_building").appendChild(farm_icon);
  document.getElementById("farm_icon").onclick = function() { createBuilding(event, entity, "farm"); };
}


function createMilitia(player)
{
  player.militia_count += 1;
}

// Add "button" to create militia; when player clicks on the castle
function castleBuildUnits(entity, player)
{
  castle_build_units = document.createElement("div");
  castle_build_units.innerHTML = "Build Miltia";
  // Id of the element.
  castle_build_units.id = "castle_build_units";
  document.getElementById(entity.id).appendChild(castle_build_units);
  castle_build_units.onclick = function () { createMilitia(player); };
}

function hideStats(entity)
{
  entity_stats = document.getElementById(entity.identity +"_stats");
  document.getElementById(entity.identity).removeChild(entity_stats);
  document.getElementById(entity.identity).onclick = function() { showStats(entity, player); };
}

// Show building stats when clicked upon.
function showStats(entity, player)
{
  console.log(entity)
  // Create element. It's id is made of building's identity and _stats prefix.
  entity_stats = document.createElement("div");
  entity_stats.innerHTML = entity.const_name + "<br>" + "HP: " + entity.hp +
  "<br>" + "Food: " + entity.food;
  entity_stats.id = entity.identity + "_stats";


  document.getElementById(entity.identity).appendChild(entity_stats);
  // Add function to remove stats.
  document.getElementById(entity.identity).onclick = function() { hideStats(entity); };

  // Function for castles to allow them to build units.
  if(entity.const_name == "Castle")
  {
    castleBuildUnits(entity_stats, player);
  }
}

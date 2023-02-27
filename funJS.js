const players = []


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
    const_name: "castle",
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
    const_name: "farm",
    identity: identity,
    hp: 100,
    food: 5,
    wood: 15,
    stone: 5,
    gold: 10
  };
  return farm_building;
};

player = createPlayer("Player1");
start_castle = buildCastle("start_castle");
start_farm = buildFarm("start_farm");

function removeOptions(entity)
{
  construct_building = document.getElementById("construct_building");
  document.getElementById(entity.id).removeChild(construct_building);
  document.getElementById(entity.id).onclick = function() { constructionOptions(entity); };
}

function attachEvents(entity)
{
  document.getElementById(entity.identity).innerHTML = entity.const_name;
  document.getElementById(entity.identity).onclick = function() { showStats(entity, player); };
}

function putCastle(event, castle)
{
  document.onmousemove = "";
  document.onclick = "";
  castle.style.top = event.clientY + "px";
  castle.style.left = event.clientX + "px";
  document.body.appendChild(castle);
  castle2 = buildCastle("new_castle");
  attachEvents(castle2);
}

function positionCastle(event, castle)
{
  document.onclick = function(event) { putCastle(event, castle); };
}

function moveCastle(event, castle, entity)
{
  document.onmousemove = function(event) { positionCastle(event, castle); };
  entity.onmouseleave = "";
}

function createCastle(event, entity)
{
  new_castle = document.createElement("div");
  new_castle.id = "new_castle";
  entity.onmouseleave = function(event) { moveCastle(event, new_castle, entity); };
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
  document.getElementById("castle_icon").onclick = function() { createCastle(event, entity); };
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
  if(entity_stats.id.search('castle'))
  {
    castleBuildUnits(entity_stats, player);
  }
}

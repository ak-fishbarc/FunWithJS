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


players.push(player);

buildings.push(start_castle);
buildings.push(start_farm);

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

function createIdentity(const_name)
{
  return identity = const_name + buildings.length.toString();
}

/// For now, all the building function are done for castles, just as a prototype.
/// As initial function get sorted out, this will change.

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
    if(parseInt(es.left) + parseInt(es.width) < parseInt(html_element.left) || parseInt(es.top) + parseInt(es.height) < parseInt(html_element.top)
      || parseInt(html_element.left) + parseInt(html_element.width) < parseInt(es.left) || parseInt(html_element.top) + parseInt(html_element.height) < parseInt(es.top))
    {
      // This comparision is due to looping through all the buildings on the map.
      // If there is a collision with any building it must return red.
      // This part is to be refactored but I don't have any more time today to do that.
      if(result != "Red" || result == "")
      {
        result = "Green";
      }
    }
    else
    {
      result = "Red";
    }
  }
  return result;
}

function putCastle(event, castle)
{
  document.onmousemove = "";
  document.onclick = "";
  castle.style.position = "fixed";
  castle.style.backgroundColor = "grey";
  document.body.appendChild(castle);
  new_castle = buildCastle(castle.id);
  attachEvents(new_castle);
}

function positionCastle(event, castle)
{

  castle.style.height = "100px";
  castle.style.width = "80px";
  castle.style.top = event.clientY + "px";
  castle.style.left = event.clientX + "px";
  if(checkPlace(castle) == "Green")
  {
    document.onclick = function(event) { putCastle(event, castle); };
  }
  else
  {
    document.onclick = "";
  }
  console.log(checkPlace(castle));
}

function moveCastle(event, castle, entity)
{
  document.onmousemove = function(event) { positionCastle(event, castle); };
  entity.onmouseleave = "";
}

function createCastle(event, entity)
{
  new_castle = document.createElement("div");
  new_identity = createIdentity("castle");
  new_castle.id = new_identity;
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

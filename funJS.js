const players = []

const farm = {
  name: "farm",
  hp: 100,
  food: 5,
  wood: 15,
  stone: 5,
  gold: 10
};

const castle = {
  name: "castle",
  hp: 1000,
  food: 10,
  wood: 20,
  stone: 50,
  gold: 100
};

/* Create player */
function createPlayer(name)
{
  const player = {
    name: name,
    militia_count: 0,
    displayMCount: function() {
      document.getElementById("player_stats").innerHTML = `Militia Count: ${this.militia_count}`;
    }
  }
  return player;
};

player = createPlayer("Player1");
// Later might be refactored together with hideStats to create one function
// to catch them all.
function removeOptions(entity)
{
  console.log("Here");
  constrBuild = document.getElementById("constrBuild");
  document.getElementById(entity.id).removeChild(constrBuild);
  document.getElementById(entity.id).onclick = function() { constrOptions(entity) };
}

function createCastle()
{
  console.log("Nothing for now");
}
// Create options for building creation
function constrOptions(entity)
{
  console.log(entity)
  constrBuild = document.createElement("div");
  constrBuild.id = "constrBuild";
  document.getElementById(entity.id).appendChild(constrBuild);
  document.getElementById(entity.id).onclick = function() { removeOptions(entity) };

  // Temporarily Here
  castleIcon = document.createElement("div");
  castleIcon.id = "castleIcon";
  document.getElementById("constrBuild").appendChild(castleIcon);
  document.getElementById("castleIcon").onclick = function() { createCastle() };
}


/* Create militia. Add count of militia to player's stats */
function createMilitia(player)
{
    player.militia_count += 1;
}

/* Add "button" to create militia, when player clicks on the castle */
function castleBuildsFun(entity, player)
{
  castleBuilds = document.createElement("div");
  castleBuilds.innerHTML = "Build Militia";
  castleBuilds.id = "castleBuilds";
  document.getElementById(entity.id).appendChild(castleBuilds);
  castleBuilds.onclick = function() { createMilitia(player) };
}

// Hide stats for buildings.
function hideStats(entity)
{
  entityStats = document.getElementById(entity.name+"Stats");
  document.getElementById(entity.name).removeChild(entityStats);
  document.getElementById(entity.name).onclick = function() { showStats(entity, player); };
}

/* Show stats for buildings, when clicked on. Creates element in HTML and
 shows information about the building.*/
function showStats(entity, player)
{
  entityStats = document.createElement("div")
  entityStats.innerHTML = entity.name + "<br>" + "HP: " + entity.hp + "<br>" +
  "Food: " + entity.food;
  entityStats.id = entity.name+"Stats";
  document.getElementById(entity.name).appendChild(entityStats);
  document.getElementById(entity.name).onclick = function() { hideStats(entity); };

  // Extra function for castles. Allowing castles to build militia.
  if(entityStats.id == "castleStats")
  {
    castleBuildsFun(entityStats, player);
  }
}

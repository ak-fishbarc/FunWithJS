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

function createMilitia(player)
{
    player.militia_count += 1;
}

function castleBuildsFun(entity, player)
{
  castleBuilds = document.createElement("div");
  castleBuilds.innerHTML = "Build Militia";
  castleBuilds.id = "castleBuilds";
  document.getElementById(entity.id).appendChild(castleBuilds);
  castleBuilds.onclick = function () { createMilitia(player) };
}

function hideStats(entity)
{
  entityStats = document.getElementById(entity.name+"Stats");
  document.getElementById(entity.name).removeChild(entityStats);
  document.getElementById(entity.name).onclick = function () { showStats(entity, player); };

}

function showStats(entity, player)
{
  entityStats = document.createElement("div")
  entityStats.innerHTML = entity.name + "<br>" + "HP: " + entity.hp + "<br>" +
  "Food: " + entity.food;
  entityStats.id = entity.name+"Stats";
  document.getElementById(entity.name).appendChild(entityStats);
  document.getElementById(entity.name).onclick = function () { hideStats(entity); };
  if(entityStats.id == "castleStats")
  {
    castleBuildsFun(entityStats, player);
  }
}

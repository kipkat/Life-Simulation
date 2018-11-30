ctx = document.getElementById("display").getContext('2d');
canvas = document.getElementById("display")
housesLocation = ""
sHistory = ""

// CUSTOM
size = 3;
rule = Math.random
born = 2e3;
death = 2e3;
trees = 60;
water = 200;
houses = 200;
creations = 950;
waterSize = 20;
minimump = 2;
maximump = 5;
speed = 1;

argRule=(min,max)=>Math.floor(rule()*max)+min
function dTerrain(size)
{
  for(tX=0; tX<canvas.width/size; tX++)
  for(tY=0; tY<canvas.height/size; tY++)
  {
    hue = argRule(50,80)
    if(argRule(-1,trees)==4)
    {
      ctx.fillStyle='hsl('+hue/5+',100%,30%)'
      ctx.fillRect(tY*size,tX*size,size,size)
    }
    else
    {
      ctx.fillStyle='hsl('+hue+',100%,30%)'
      ctx.fillRect(tY*size,tX*size,size,size)
    }
  }
  sHistory += 'terrain:'+canvas.width/size+","+canvas.height/size+"."
}
waterZone = []
function dWater(size)
{
  for(tX=0; tX<canvas.width/size; tX++)
  for(tY=0; tY<canvas.height/size; tY++)
  {
    hue = rule()*40+150
    if(argRule(-1,water)==4)
    {
      ctx.fillStyle='hsl('+hue+',100%,30%)'
      wSize1 = argRule(0,waterSize)
      wSize2 = argRule(0,waterSize)
      ctx.fillRect(tY*size,tX*size,size*wSize1,size*wSize2)
      waterZone.push([tY*size,tX*size,size*wSize1+tY*size,size*wSize2+tX*size])
    }
  }
  sHistory += 'water:'+canvas.width/size+","+canvas.height/size+"."
}
alive = [];
function life(male,startX=argRule(0,canvas.width/size),startY=argRule(0,canvas.width/size))
{
  this.pX = startX
  this.housesBuilt = 0
  this.pY = startY
  this.id = (Math.random()*1e17).toString(36).toUpperCase();
  this.male = male;
  this.drankWater = 0;
  this.intelligence = 1;
  sHistory += 'life:'+this.pX+","+this.pY+","+this.male+"."
  if (this.male == undefined)
  {
    this.male = argRule(0,2);
  }
  ctx.fillStyle = '#eac086'
  ctx.fillRect(this.pY*size,this.pX*size,size,size)
  alive.push([this])
  this.age = 0.9;
  this.brain = ''
  this.move = function()
  {
    this.age += size/this.intelligence;
    save = [this.pY, this.pX]
    if (rule()<.5)
    {
      if(this.pX>canvas.width/size/2) this.pX += rule()<.54 ? -1 : 1;
      else this.pX += rule()<.46 ? -1 : 1;
    }
    else
    {
      if(this.pY>canvas.width/size/2) this.pY += rule()<.52 ? -1 : 1;
      else this.pY += rule()<.48 ? -1 : 1;
    }
    if(this.pX<0) this.pX=size;
    if(this.pY<0) this.pY=size;
    if(this.pY*size>canvas.width) this.pY=canvas.width/size;
    if(this.pX*size>canvas.width) this.pX=canvas.width/size;
    ctx.fillStyle = '#eac086'
    ctx.fillRect(this.pY*size,this.pX*size,size,size)
    hue = argRule(75,110)
    this.pY*=1;
    this.pX*=1;
    for (lake of waterZone)
    {
      if (this.pX > lake[0] && this.pX < lake[2]
          && this.pY > lake[1] && this.pY < lake[3])
          {
            this.drankWater+=this.intelligence/this.age;
          }
    }
    if(argRule(0,creations)==4)
    {
      ctx.fillStyle='hsl('+hue*hue+',100%,30%)'
      ctx.fillRect(save[0]*size,save[1]*size,size*argRule(0,9),size*argRule(0,9))
      this.intelligence+=10;
      this.brain += "."+this.pX+"!"+this.pY+"~"+size/this.intelligence/this.age*this.drankWater/this.creations
      this.brain = btoa(this.brain)
      sHistory += 'creation: '+housesLocation+", material: "+hue*hue+"."
    }
    if(argRule(0,houses)==4)
    {
      ctx.fillStyle='hsl('+hue/3+',100%,30%)'
      ctx.fillRect(save[0]*size,save[1]*size,size*argRule(0,9),size*argRule(0,9))
      this.intelligence++;
      this.housesBuilt++
      housesLocation += this.pX+","+this.pY+";"
      sHistory += 'house: '+housesLocation+", wood: "+hue/3+"."
    }
    else
    {
      ctx.fillStyle='hsl('+hue+',100%,30%)'
      if(housesLocation.indexOf(this.pX+","+this.pY+";")<0) ctx.fillRect(save[0]*size,save[1]*size,size,size)
      else
      {
        ctx.fillStyle='hsl('+hue/3+',100%,30%)'
        ctx.fillRect(save[0]*size,save[1]*size,size*argRule(0,9),size*argRule(0,9))
      }
    }
    if (alive[argRule(0,alive.length)][0].male == alive[argRule(0,alive.length)][0].male
        && argRule(0,born)==1 && alive.length<maximump)
    {
      child = new life()
      sHistory += 'child.'
    }
    if (argRule(0,death*3)==1 && alive.length>minimump)
    {
      alive.shift();
      sHistory += 'dead.'
    }
    sHistory += 'Move ~ brain: '+this.brain+", intelligence: "+this.intelligence+", id: "+this.id+", age: "+this.age+"."
  }
}

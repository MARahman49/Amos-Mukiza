<template>
  <div class="header">
     <div class="head">
    <div class="headerobjectswrapper">
        <div class="weatherforcastbox"><span style="font-style: italic;">Weatherforcast for the next 24 hours: Plenty of Sunshine</span><br><span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span></div>
        <header>The Truth</header>
        </div>
        <div class="subhead">York, MA - Thursday August 30, 1978 - Seven Pages</div>
</div>
  </div>
</template>

<script>

export default {
  name: 'blogHeader',
}
</script>

<style scoped>

header{
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 80px;
    text-transform: uppercase;
    display: inline-block;
    line-height: 72px;
    margin-bottom: 20px;

}

p{
    margin-top: 0;
    margin-bottom: 20px;
}

.head{
    text-align: center;
    position: relative;
}

.subhead{
    text-transform: uppercase;
    border-bottom: 2px solid #2f2f2f;
    border-top: 2px solid #2f2f2f;
    padding: 12px 0 12px 0;

}
.weatherforcastbox{
    position: relative;
    width: 12%;
    left: 10px;
    border: 3px double #2f2f2f;
    padding: 12px 18px 12px 18px;
    line-height: 20px;
    display: inline-block;
    margin: 0 50px 20px -360px;
}
@media only all and (max-width: 1300px) {
    .weatherforcastbox{
        display: none;
    }
}
@media only all and (max-width: 600px) {
  header{
    max-width: 320px;
    font-size: 60px;
    line-height: 54px;
    overflow: hidden;
  }
}
</style>


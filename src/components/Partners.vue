<template>
  <div class="partners">
    <h1>SPONZOŘI</h1>
    <div class="partners-inner">
      <div><img src="/sponzori/sirek-bw.png"></div>
      <div><img src="/sponzori/servis-bw.png"></div>
      <div><img src="/sponzori/kojetin-bw.jpg"></div>
      <div><img src="/sponzori/smotana-bw.png"></div>
      <div><img src="/sponzori/beseda-bw.png"></div>
      <div><img src="/sponzori/technis-bw.png"></div>
      <div><img src="/sponzori/hotel-bw.png"></div>
      <div><img src="/sponzori/ptacek-bw.jpg"></div>
      <div><img src="/sponzori/olomouc-bw.png"></div>
      <div><img src="/sponzori/mk-bw.jpg"></div>
      <div><img src="/sponzori/meks-bw.jpg"></div>
      <div><span><b>DOLABUŽ</b>Masarykovo náměstí Kojetín</span></div>
      <div><span><b>LÉKÁRNA U ZLATÉHO LVA</b></span></div>
      <div><span><b>ZAHRADNICTVÍ - ZAHRÁDKÁŘSKÉ POTŘEBY</b>Vyškovská ulice Kojetín</span></div>
      <div><span><b>HMS - REAL s.r.o.</b>Stavební a obchodní činnost</span></div>
      <div><span><b>ELMAPEK s.r.o.</b>elektromontáže</span></div>
      <div><span><b>INSTALACE 206</b>Roman Kusák s.r.o.</span></div>
      <div><span><b>Dobrůtky od Verunky</b>náměstí Republiky Kojetín</span></div>
      <div><span><b>MULTI-S s.r.o.</b>Hulínská ulice Kroměříž</span></div>
      <div><span><b>Barták Zdeněk s.r.o.</b>Samostatnost 1348 Holešov</span></div>
    </div>
  </div>
</template>

<style lang="scss">
  .partners {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 150px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    .partners-inner {
      display: inline-grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      padding: 120px;
      gap: 60px 10px;
    }
    h1 {
      color: white;
      font-family: Montserrat;
      font-size: 70px;
      text-align: center;
      width: 100%;
    }
    //justify-content: space-around;
    //align-items: center;
    //align-content: space-around;
    div {
      text-align: center;
      color: white;
      font-size: 0.9eM;
      display: flex;
      align-items: center;
      justify-content: center;
      b {
        display: block;
      }
    }
    img {
      display: inline-block;
      max-width: 270px;
    }
  }
</style>
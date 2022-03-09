<template>
  <div id="program" class="flex w-full flex-col justify-center grow-0">
    <template v-for="(show, index) in shows">
      <FestivalProgramItem :show="show" small="true"/>
      <hr>
    </template>
  </div>
</template>

<script>
import FestivalProgramItem from './FestivalProgramItem.vue';
export default {
  name: 'FestivalProgram',
  components: {FestivalProgramItem},
  computed: {
    shows: () => {
      return shows.thursday
    }
  }
}

let shows = {
  wednesday: [
    {
      showName: 'Zahájení přehlídky',
      groupName: '',
      time: '20:00',
      length: null,
    },
    {
      showName: 'Bordel na ministerstvu',
      groupName: 'Hanácká scéna Kojetín',
      time: '20:00',
      length: 95,
    },
  ],
  thursday: [
    {
      showName: 'Dášeňka čili život štěnete',
      groupName: 'Divadlo Scéna Zlín',
      time: '8:15',
      length: 90,
    },
    {
      showName: 'Dášeňka čili život štěnete',
      groupName: 'Divadlo Scéna Zlín',
      time: '10:00',
      length: 90,
    },
    {
      showName: 'Dům Bernardy Alby',
      groupName: 'DS ASpol. Lužánky Brno',
      time: '16:00',
      length: 90,
    },
    {
      showName: 'Velká zebra aneb jakže se to jmenujete?',
      groupName: 'Divadelní spolek Kroměříž',
      time: '20:00',
      length: 90,
    },
  ],
  friday: [
    {
      showName: 'O PRINCEZNĚ, KTERÁ RÁČKOVALA',
      groupName: 'Divadlo Scéna Zlín',
      time: '10:00',
      length: 90,
    },
    {
      showName: 'MANŽELÉ V NESNÁZÍCH',
      groupName: 'Divadelní spolek Slavkov u Brna',
      time: '16:00',
      length: 80,
    },
    {
      showName: 'TRHNI SI, OTČE!',
      groupName: 'Divadlo Brod Uherský Brod',
      time: '20:00',
      length: 90,
    },
  ],
  saturday: [
    {
      showName: 'Edith',
      groupName: 'Divadlo Blic Ostrožská Nová Ves',
      time: '11:00',
      length: 105,
    },
    {
      showName: 'Pan Polšťář',
      groupName: 'Ragueneau Plzeň',
      time: '16:00',
      length: 100,
    },
    {
      showName: 'Baletky',
      groupName: 'Divadlo Václav Václavov',
      time: '20:00',
      length: 65,
    },
  ],
  sunday: [
    {
      showName: 'Koprovka aneb Na útěku',
      groupName: 'Blanenské divadlo',
      time: '11:00',
      length: 70,
    },
    {
      showName: 'VYHLÁŠENÍ VÝSLEDKŮ A UKONČENÍ',
      groupName: '',
      time: '16:00',
      length: 60,
    },
  ]
}
</script>

<style scoped>
#program {
  height: 75%;
}
</style>


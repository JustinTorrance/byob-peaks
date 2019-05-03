const rangesData = require('../rangesData')

const createRanges = (knex, ranges) => {
  return knex("ranges")
    .insert(
      {
        name: ranges.name,
        tallest_peaks: ranges.tallest_peaks,
      },
      'id'
    )
    .then(range_id => {
      let rangesPromises = []

      ranges.mountains.forEach(mountain => {
        rangesPromises.push(
          createRanges(knex, {
            name: mountain.name,
            elevation: mountain.elevation,
            rank: mountain.rank,
            range_id: range_id[0]
          })
        )
      })
      return Promise.all(rangesPromises)
    })
}

const createMountain = (knex, mountains) => {
  return knex("mountains").insert(mountains)
}

exports.seed = function(knex, Promise) {
  return knex('mountains')
    .del() 
    .then(() => knex('ranges').del()) 
    .then(() => {
      let rangesPromises = []
      rangesData.forEach(range => {
        rangesPromises.push(createRanges(knex, range))
      })

      return Promise.all(rangesPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
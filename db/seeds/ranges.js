const data = require('../data')

const createRanges = (knex, range) => {
  return knex("ranges")
    .insert(
      {
        name: range.name,
        tallest_peaks: range.tallest_peaks,
      },
      'id'
    )
    .then(range_id => {
      let mountainPromises = []

      range.mountains.forEach(mountain => {
        mountainPromises.push(
          createMountain(knex, {
            name: mountain.name,
            elevation: mountain.elevation,
            rank: mountain.rank,
            range_id: range_id[0]
          })
        )
      })
      return Promise.all(mountainPromises)
    })
}

const createMountain = (knex, mountain) => {
  return knex("mountains").insert(mountain)
}

exports.seed = (knex, Promise) => {
  return knex("mountains")
    .del() 
    .then(() => knex('ranges').del()) 
    .then(() => {
      let rangePromises = []
      data.forEach(range => {
        rangePromises.push(createRanges(knex, range))
      })

      return Promise.all(rangePromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
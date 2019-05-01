exports.seed = function(knex, Promise) {
  return knex('mountains').del() 
    .then(() => knex('ranges').del()) 

    .then(() => {
      return Promise.all([
        
        knex('ranges').insert({
          name: 'St Elias Mountains', tallest_peaks: '19'
        }, 'id')
        .then(ranges => {
          return knex('mountains').insert([
            //link range_id with Alaska Range id
            { name: 'Denali', range_id: ranges[8] },
            //link range_id with st elias mountains range id
            { note: 'Mt Logan', range_id: ranges[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
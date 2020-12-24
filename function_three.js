const { availability_slots } = require('./no_sql_schema.json');

module.exports = (fieldId, startDate, endDate) => {
  const slots = availability_slots
    .filter(slot => 
        slot.field === fieldId && 
        slot.start_time >= startDate && 
        slot.start_time <= endDate &&
        !slot.game
      )
    .length;

  return slots;
};

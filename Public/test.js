

// FHI.test.js
const FHI = require('./main.js'); // Update the path to the FHI.js file
const firebase = require('@firebase/rules-unit-testing');

// Mock Firebase database reference
jest.mock('firebase', () => {
  return {
    database: () => ({
      ref: () => ({
        limitToFirst: () => ({
          once: (event, callback) => {
            // Simulate snapshot data
            const snapshot = {
              forEach: (forEachCallback) => {
                // Simulate ChildSnapshot data
                const ChildSnapshot = {
                  val: () => ({
                    // Simulate your data here
                  }),
                };
                forEachCallback(ChildSnapshot);
              },
            };
            callback(snapshot);
          },
        }),
      }),
    }),
  };
});

describe('FHI function', () => {
  test('should call Firebase and insert rows', () => {
    // Mock DOM elements
    document.body.innerHTML = '<table id="table"></table>';

    // Call the FHI function
    FHI();

    // Add your assertions here
    // For example, you can check if rows were inserted into the table
    const table = document.getElementById('table');
    const rows = table.getElementsByTagName('tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});

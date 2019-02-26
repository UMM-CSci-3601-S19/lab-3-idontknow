Behaviors that were tested in our e2e tests:

- Using each filter individually (owner, status, and body) to return
todos that have the desired characteristics.

- The filter by body tested a blank character ' ' to ensure that the 
list was unchanged. It then received a common string and another less
common string to test the filter.

- The filter by status test used a non-status input 'com' to make sure
the list didn't change. It then tested each status individually.

- The filter by owner test made sure that entering a single letter
would return an appropriate list of owners that contained the letter.

- A test of combining filters in all possible combinations was done at
the end. This just made sure they were all working together.

- Erasing inputs to return todos that were previously filtered out.
This was done at the end of each filter test, and the final combination
test.


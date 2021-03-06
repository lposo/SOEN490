# This python script produces the category-subcat-query.txt file containing the queries used to populate the category and subcategory tables in databoom_db_test.
# The JSON used is the datasets-with-datapoints.json which was produced by the datasets-builder.py script found in Builders folder.

# WARNING:
# This script MUST be RUN before dataset-script.py
# This is because of Line 59, where we update dataset-with-datapoints.json to include categoryId's and subcategoryId's

import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path = os.chdir(dir_path)

file = open("../Queries in txt/6 - category-subcat-query.txt", "w+")
with open("../Scraped JSONs/datasets-with-datapoints.json") as f:
    data = json.load(f)

file.write(" INSERT INTO `databoom_db`.`category` (`name`, `id`) VALUES ('N/A', 1);\n")
file.write(
    " INSERT INTO `databoom_db`.`subcategory` (`name`, `id`) VALUES ('N/A', 1);\n"
)

list_of_category = dict()
list_of_subcategory = dict()
categoryIdCount = 2  # count for category id
subcategoryIdCount = 2  # count for subcategory id

list_of_category["N/A"] = {"name": "N/A", "id": 1}
list_of_subcategory["N/A"] = {"name": "N/A", "id": 1}

for x in data:  # Loop through dataset

    # Create a subcategory object with value "not applicable" if there is none
    if "subcategory" not in data[x]:
        data[x]["subcategory"] = "N/A"

    if data[x]["category"] not in list_of_category:
        list_of_category[data[x]["category"]] = {
            "name": data[x]["category"],
            "id": categoryIdCount,
        }  # insert category into dictionary

        # Category query
        file.write(
            " INSERT INTO `databoom_db`.`category` (`id`,`name`) VALUES ("
            + str(categoryIdCount)
            + ',"'
            + data[x]["category"]
            + '");\n'
        )

        # Create categoryId object in JSON
        data[x]["categoryId"] = categoryIdCount

        categoryIdCount += 1
    else:
        # Create count object in JSON
        data[x]["categoryId"] = list_of_category[data[x]["category"]]["id"]

    if data[x]["subcategory"] not in list_of_subcategory:
        list_of_subcategory[data[x]["subcategory"]] = {
            "name": data[x]["subcategory"],
            "id": subcategoryIdCount,
        }  # insert category into dictionary

        # Subcategory query
        file.write(
            " INSERT INTO `databoom_db`.`subcategory` (`id`,`name`) VALUES ("
            + str(subcategoryIdCount)
            + ',"'
            + data[x]["subcategory"]
            + '");\n'
        )

        # Create subcategoryId object in JSON
        data[x]["subcategoryId"] = subcategoryIdCount

        subcategoryIdCount += 1
    else:
        # Create count object in JSON
        data[x]["subcategoryId"] = list_of_subcategory[data[x]["subcategory"]]["id"]

with open("../Scraped JSONs/datasets-with-datapoints.json", "w") as outfile:
    json.dump(data, outfile, indent=4)
outfile.close

file.close()
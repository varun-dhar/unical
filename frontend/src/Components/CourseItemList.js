import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";

export default function CourseItemList(props) {
    const [courseList, setCourseList] = useState({});
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        var data = {
            "CS2501": {
                "sections": [
                {
                    "crn": "21068",
                    "seatsRemaining": 5,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Benjamin Hescott",
                        "n_ratings": 10,
                        "overall_difficulty": 3.8,
                        "overall_rating": 4.2,
                        "percent_take_again": 0.7780000000000001,
                        "course_rating": {}
                    },
                    {
                        "name": "Nathaniel Derbinsky",
                        "n_ratings": 27,
                        "overall_difficulty": 3.1,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "R",
                        "start": 62100,
                        "end": 68100,
                        "location": "West Village H 210B"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19733",
                    "seatsRemaining": 3,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 55500,
                        "end": 61500,
                        "location": "West Village H 210A"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19736",
                    "seatsRemaining": 3,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 62100,
                        "end": 68100,
                        "location": "West Village H 210A"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19740",
                    "seatsRemaining": 9,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 68700,
                        "end": 74700,
                        "location": "West Village H 210B"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "18043",
                    "seatsRemaining": 12,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 28800,
                        "end": 34800,
                        "location": "West Village H 212"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19738",
                    "seatsRemaining": 8,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 62100,
                        "end": 68100,
                        "location": "West Village H 212"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19734",
                    "seatsRemaining": 3,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 55500,
                        "end": 61500,
                        "location": "West Village H 210B"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19737",
                    "seatsRemaining": 6,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 62100,
                        "end": 68100,
                        "location": "West Village H 210B"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19724",
                    "seatsRemaining": 4,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 35400,
                        "end": 41400,
                        "location": "West Village H 210A"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19730",
                    "seatsRemaining": 3,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 48900,
                        "end": 54900,
                        "location": "West Village H 210A"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19726",
                    "seatsRemaining": 1,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 35400,
                        "end": 41400,
                        "location": "West Village H 212"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19735",
                    "seatsRemaining": 12,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 55500,
                        "end": 61500,
                        "location": "West Village H 212"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19739",
                    "seatsRemaining": 15,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 68700,
                        "end": 74700,
                        "location": "West Village H 210A"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "18009",
                    "seatsRemaining": 5,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 28800,
                        "end": 34800,
                        "location": "West Village H 210B"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19731",
                    "seatsRemaining": 1,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "T",
                        "start": 48900,
                        "end": 54900,
                        "location": "West Village H 210B"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "19742",
                    "seatsRemaining": 31,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Benjamin Hescott",
                        "n_ratings": 10,
                        "overall_difficulty": 3.8,
                        "overall_rating": 4.2,
                        "percent_take_again": 0.7780000000000001,
                        "course_rating": {}
                    },
                    {
                        "name": "Nathaniel Derbinsky",
                        "n_ratings": 27,
                        "overall_difficulty": 3.1,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {}
                    }
                    ],
                    "classType": "Lab",
                    "classTimes": [
                    {
                        "day": "R",
                        "start": 37800,
                        "end": 43800,
                        "location": "West Village H 210A"
                    }
                    ],
                    "examTimes": []
                }
                ],
                "credits": 1,
                "nupath": []
            },
            "CS2500": {
                "sections": [
                {
                    "crn": "16808",
                    "seatsRemaining": 41,
                    "waitRemaining": 0,
                    "profs": [],
                    "classType": "Lecture",
                    "classTimes": [
                    {
                        "day": "M",
                        "start": 37800,
                        "end": 41700,
                        "location": "Shillman Hall 305"
                    },
                    {
                        "day": "W",
                        "start": 37800,
                        "end": 41700,
                        "location": "Shillman Hall 305"
                    },
                    {
                        "day": "R",
                        "start": 37800,
                        "end": 41700,
                        "location": "Shillman Hall 305"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "10330",
                    "seatsRemaining": 29,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Benjamin Hescott",
                        "n_ratings": 10,
                        "overall_difficulty": 3.8,
                        "overall_rating": 4.2,
                        "percent_take_again": 0.7780000000000001,
                        "course_rating": {}
                    },
                    {
                        "name": "Nathaniel Derbinsky",
                        "n_ratings": 27,
                        "overall_difficulty": 3.1,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {
                        "rating": 4.956521739130435,
                        "difficulty": 3.130434782608696,
                        "n_ratings": 23,
                        "take_again": 1
                        }
                    }
                    ],
                    "classType": "Lecture",
                    "classTimes": [
                    {
                        "day": "M",
                        "start": 33300,
                        "end": 37200,
                        "location": "Richards Hall 458"
                    },
                    {
                        "day": "W",
                        "start": 33300,
                        "end": 37200,
                        "location": "Richards Hall 458"
                    },
                    {
                        "day": "R",
                        "start": 33300,
                        "end": 37200,
                        "location": "Richards Hall 458"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "14548",
                    "seatsRemaining": 21,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Leena Razzaq",
                        "n_ratings": 142,
                        "overall_difficulty": 3.6999999999999997,
                        "overall_rating": 2.8000000000000003,
                        "percent_take_again": 0.47100000000000003,
                        "course_rating": {
                        "rating": 1.340702947845805,
                        "difficulty": 1.9135487528344672,
                        "n_ratings": 84,
                        "take_again": 0.375
                        }
                    }
                    ],
                    "classType": "Lecture",
                    "classTimes": [
                    {
                        "day": "M",
                        "start": 48900,
                        "end": 52800,
                        "location": "Shillman Hall 135"
                    },
                    {
                        "day": "W",
                        "start": 48900,
                        "end": 52800,
                        "location": "Shillman Hall 135"
                    },
                    {
                        "day": "R",
                        "start": 48900,
                        "end": 52800,
                        "location": "Shillman Hall 135"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "11539",
                    "seatsRemaining": 4,
                    "waitRemaining": 0,
                    "profs": [],
                    "classType": "Lecture",
                    "classTimes": [
                    {
                        "day": "M",
                        "start": 48900,
                        "end": 52800,
                        "location": "Shillman Hall 105"
                    },
                    {
                        "day": "W",
                        "start": 48900,
                        "end": 52800,
                        "location": "Shillman Hall 105"
                    },
                    {
                        "day": "R",
                        "start": 48900,
                        "end": 52800,
                        "location": "Shillman Hall 105"
                    }
                    ],
                    "examTimes": []
                },
                {
                    "crn": "11538",
                    "seatsRemaining": 4,
                    "waitRemaining": 0,
                    "profs": [
                    {
                        "name": "Arjun Guha",
                        "n_ratings": 24,
                        "overall_difficulty": 3.7000000000000006,
                        "overall_rating": 4.800000000000001,
                        "percent_take_again": 1,
                        "course_rating": {
                        "rating": 2.618055555555556,
                        "difficulty": 1.9409722222222223,
                        "n_ratings": 24,
                        "take_again": 1
                        }
                    }
                    ],
                    "classType": "Lecture",
                    "classTimes": [
                    {
                        "day": "M",
                        "start": 42300,
                        "end": 48300,
                        "location": "Snell Engineering Center 168"
                    },
                    {
                        "day": "R",
                        "start": 42300,
                        "end": 48300,
                        "location": "Snell Engineering Center 168"
                    }
                    ],
                    "examTimes": []
                }
                ],
                "credits": 4,
                "nupath": [
                "Formal/Quant Reasoning",
                "Natural/Designed World"
                ]
            }
        }

        setCourseList(data);
        setInitialized(true);
    }, []);

    return (
        <div className="course-item-list-container">
            { initialized &&
                Object.keys(courseList).map((item, key) => {
                    return <div className="course-item-list-map-container" key={key}>
                        { courseList[item]["sections"].map((section, sectionKey) => {
                            section["courseName"] = item;
                            section["courseIndex"] = String(sectionKey + 1);
                            section["credits"] = courseList[item]["credits"];
                            return <CourseItem key={sectionKey} course={section}/>
                        }) }
                    </div>
                })
            } 
        </div>
    )
}
/**
 * Function to calculate overall correct answers from a set of results
 * @param results - set of results
 * @returns {Array} of amount of correct answers
 */
function calculateOverallCorrect(results) {
    var overallcorrect = [];
    for (var i = 0; i < results[0].length; i++) {
        overallcorrect[i] = 0;
        for (var j = 0; j < results.length; j++) {
            if (results[j][i] == 1) {
                overallcorrect[i]++;
            }
        }
    }
    return overallcorrect;
}

/**
 * Function to calculate overall incorrect answers from a set of results
 * @param results - set of results
 * @returns {Array} of amount of incorrect answers
 */
function calculateOverallIncorrect(results) {
    var overallincorrect = [];
    for (var i = 0; i < results[0].length; i++) {
        overallincorrect[i] = 0;
        for (var j = 0; j < results.length; j++) {
            if (results[j][i] == 0) {
                overallincorrect[i]++;
            }
        }
    }
    return overallincorrect;
}

/**
 * Function to calculate average percentage of correct answers from a set of results
 * @param results - set of results
 * @returns {Array} of average percentages of correct answers
 */
function calculateAverageCorrect(results) {
    var averages = [];
    for (var i = 0; i < results[0].length; i++) {
        var sum = 0;
        for (var j = 0; j < results.length; j++) {
            sum += (results[j][i] * 100);
        }
        var average = sum / results.length;
        averages[i] = average.toFixed(2);
    }
    return averages;
}

/**
 * Calculates the amount of passes from a set of results
 * @param results - set of results
 * @returns {number} - Amount of passes in the set of results
 */
function calculatePasses(results) {
    var correct = 0;
    var passes = 0;

    // Initially calculate the amount of correct answers per student's submission
    for (var j = 0; j < results.length; j++) {
        for (var i = 0; i < results[j].length; i++) {
            if (results[j][i] == 1)
                correct++;
        }
        // Calculate this as a percentage
        var percentage = (correct / results[j].length) * 100;
        // If percentage is above 40% then increment the passes variable
        if (percentage >= 40) {
            passes++;
        }

        correct = 0;
    }
    return passes;
}

/**
 * Calculates the amount of fails from a set of results
 * @param results - set of results
 * @returns {number} - Amount of fails in the set of results
 */
function calculateFails(results) {
    var correct = 0;
    var fails = 0;

    // Initially calculate the amount of correct answers per student's submission
    for (var j = 0; j < results.length; j++) {
        for (var i = 0; i < results[j].length; i++) {
            if (results[j][i] == 1)
                correct++;
        }
        // Calculate this as a percentage
        var percentage = (correct / results[j].length) * 100;
        // If percentage is below 40% then increment the fails variable
        if (percentage < 40) {
            fails++;
        }
        correct = 0;
    }
    return fails;
}

/**
 * Displays student results in a pie chart and mark breakdown table
 * @param data - Passed results
 * @param ui - The JQuery accordion object
 */
function displayStudentResults(data, ui) {

    var answers = jQuery.parseJSON(data);

    // If student has submitted answers
    if (answers.length > 0) {

        // Get correct and incorrect answers
        var correct = calculateOverallCorrect(answers);
        var incorrect = calculateOverallIncorrect(answers);
        var overallCorrect = 0;
        var overallIncorrect = 0;

        for (var i = 0; i < correct.length; i++) {
            overallCorrect += correct[i];
            overallIncorrect += incorrect[i];
        }

        // Get students grade as a percentage
        var percentage = (overallCorrect / answers[0].length) * 100;

        // Display students result (pass or fail)
        $html = '<table width="100%" border="0" cellpadding="2" cellspacing="0">' +
        '<tr>' +
        '<td colspan="2">' +
        '<div class="test-result">';

        if (percentage < 40) {
            $html += '<span class="class-list">' +
            '<i class="fa fa-times"></i>' +
            ' Result: <b>' + percentage.toFixed(2) + '%</b> (Fail)'
        } else {
            $html += '<span class="class-list">' +
            '<i class="fa fa-check"></i>' +
            ' Result: <b>' + percentage.toFixed(2) + '%</b> (Pass)'
        }

        // Displays student marks as a pie chart
        $html += '</span>' +
        '</div>' +
        '</td>' +
        '<tr>' +
        '<td rowspan="2">' +
        '<div class="info-box student-result">' +
        '<table cellpadding="8" cellspacing="0" border="1" class="answer-table" width="98%">' +
        '<tr class="answer-table-header">' +
        '<td colspan="2">' +
        '<i class="fa fa-bar-chart"></i> Questions' +
        '</td>' +
        '</tr>';

        // Display students mark breakdown in tabular format
        for (var i = 0; i < answers[0].length; i++) {
            if (answers[0][i] == 1)
                $html += '<tr class="correct-answer"><td>' + (i + 1) + '</td><td><i class="fa fa-check "></i> Correct';
            if (answers[0][i] == 0)
                $html += '<tr class="incorrect-answer"><td>' + (i + 1) + '</td><td><i class="fa fa-times "></i> Incorrect';
            $html += '</td></tr>';
        }

        $html += '</table></div>' +
        '</td>' +
        '<td width="20%">' +
        '<div style="text-align: center" class="info-box student-result">' +
        '<canvas id="myChart" width="150"></canvas>' +
        '</div>' +
        '</td>' +
        '</tr>' +
        '</table>';

        $(ui.newHeader[0]).next().html($html);

        // Fill Pie Chart canvas with data
        if ($('#myChart').length) {
            // Pie/Polar Chart Data
            var pieData = [{
                value: overallIncorrect,
                color: "rgba(187, 68, 68, 0.69)",
                highlight: "#FF5A5E",
                label: "Incorrect"
            }, {
                value: overallCorrect,
                color: "rgba(75, 142, 75, 0.75)",
                highlight: "#49AF49",
                label: "Correct"
            }];

            var ctx = $("#myChart").get(0).getContext("2d");
            // This will get the first returned node in the jQuery collection.
            var resultsPieChart = new Chart(ctx).PolarArea(pieData, {
                responsive: false
            });
        }
    } else {
        // If student has not submitted answers, inform the user
        $(ui.newHeader[0]).next().html("No answers submitted for this test!");
    }
}

/**
 * Creates a Bar and Line Graph for the results passed
 * @param data - The passed results
 */
function displayResultsGraphs(data) {
    // Check that some results have been returned
    if (data !== '[]') {
        var questions = [];
        var results = jQuery.parseJSON(data);

        // labels for the charts
        for (var i = 0; i < results[0].length; i++) {
            questions[i] = 'Q ' + (i + 1);
        }

        // display the containers for the canvases (chartjs)
        $(".canvas-container").show();

        // Bar Graph Data
        var barData = {
            labels: questions,
            datasets: [{
                label: "Correct",
                fillColor: "rgba(75, 142, 75, 0.75)",
                strokeColor: "rgba(75, 142, 75, 0.75)",
                highlightFill: "#669666",
                highlightStroke: "#276F27",
                data: calculateOverallCorrect(results)
            }, {
                label: "Incorrect",
                fillColor: "rgba(187, 68, 68, 0.69)",
                strokeColor: "rgba(187, 68, 68, 0.69)",
                highlightFill: "#B95858",
                highlightStroke: "#9A2D2D",
                data: calculateOverallIncorrect(results)
            }]
        };

        // Line Graph Data
        var lineData = {
            labels: questions,
            datasets: [{
                label: "% Correct",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: calculateAverageCorrect(results)
            }]
        };

        // Bar Chart Results Graph
        $("#testresults").html("");
        var ctx = $("#testresults").get(0).getContext("2d");
        ctx.canvas.width = 500;
        ctx.canvas.height = 200;
        myBarChart = new Chart(ctx).Bar(barData, {
            scaleOverride: true,
            scaleSteps: results.length,
            scaleStepWidth: 1,
            scaleStartValue: 0
        });

        // Line Chart Average Results Graph
        $("#testaverages").html("");
        var ctx = $("#testaverages").get(0).getContext("2d");
        ctx.canvas.width = 500;
        ctx.canvas.height = 200;
        var myBarChart = new Chart(ctx).Line(lineData, {
            scaleOverride: true,
            scaleSteps: 10,
            scaleStepWidth: 10,
            scaleStartValue: 0

        });

        var passes = calculatePasses(results);
        var fails = calculateFails(results);

        $("#results-summary").html("<br/><div class='class-list'><label>" +
            "<i class='fa fa-check'></i> Passes: <b>" + passes + "</b> (" +
            (passes / (passes + fails) * 100).toFixed(2) + "% of submissions)</label><label><br />" +
            "<i class='fa fa-times'></i> Fails: <b>" + fails + "</b> (" +
            (fails / (passes + fails) * 100).toFixed(2) + "% of submissions)</label></div>");
    } else {
        // If no results found, inform the user
        // TODO: Make this remove the html currently loaded in the results section
        alert("No Results Found!");
    }
}

/**
 * Load the overall results for the selected test
 * @param data - The selected option from the test choice select menu
 */
function displayOverallTestResults(data) {
    // Get the selected test id
    var testid = (data.item.element[0].attributes[0].nodeValue);
    if (testid != 'None') {
        // Display 'Retrieving results..' alert
        $('#modal').modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
        // Get all students who sat the test
        $.ajax({
            url: "/testplaza/php/getstudentsfortest.php?testID=" + testid,
            success: function(data) {
                var obj = jQuery.parseJSON(data);
                studentNos = obj[0];
                classes = obj.slice(1);

                // Print their results
                $.ajax({
                    url: "/testplaza/php/getstudentresults.php?testID=" + testid + "&studentID=" + studentNos,
                    success: function(data) {
                        $.modal.close();
                        displayResultsGraphs(data);

                        // Populate the drop down menu with the classes that sat the test
                        $classSelectHTML = "<select name='class' id='classselect' class='select-menu'>" +
                            "<option value='None'>(Optional: Define results by class)</option>";

                        for (var i = 0; i < classes.length; i++) {
                            $classSelectHTML += ("<option value=" + classes[i][0] + ">" + classes[i][1] + "</option>");
                        }

                        $classSelectHTML += "</select><br/>";
                        $(".class-select-container").html($classSelectHTML);

                        // Display results for selected class
                        $("#classselect").selectmenu({
                            width: null,
                            change: function(event, data) {
                                displayClassResults(data, testid);
                            }
                        });

                    },
                    datatype: "json"
                });
            },
            datatype: "json"
        });
    }
}

/**
 * Display results for a specific chosen class
 * @param data - The selected choice from the class select select menu
 * @param testid - The selected test
 */
function displayClassResults(data, testid) {
    var classid = data.item.element[0].attributes[0].nodeValue;
    if (classid != 'None') {
        // Display 'Retrieving results..' Alert
        $('#modal').modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });

        // Get the student ids and names for the selected class
        $.ajax({
            url: "/testplaza/php/getstudentforclass.php?classid=" + classid,
            success: function(data) {
                obj = jQuery.parseJSON(data);
                var studentIds = [];
                var studentNames = [];
                for (var i = 0; i < obj.length; i++) {
                    studentIds.push(obj[i][0]);
                    studentNames.push(obj[i][1]);
                }

                // Print the results of these students
                $.ajax({
                    url: "/testplaza/php/getstudentresults.php?testID=" + testid + "&studentID=" + studentIds,
                    success: function(data) {
                        $.modal.close();
                        displayResultsGraphs(data);

                        // Populate the accordion with the students in the class
                        $accordionHTML = "";
                        for (var i = 0; i < studentIds.length; i++) {
                            $accordionHTML += "<h3 studentid=" + studentIds[i] +
                                " testid=" + testid + " >" + studentNames[i] +
                                "</h3><div></div>";

                        }
                        $("#padding").html("<br/><label class='class-list'><i class='fa fa-user'></i> Individual Student Marks</label>");
                        $("#accordion").html($accordionHTML);
                        $('#accordion').accordion("refresh");
                    },
                    datatype: "json"
                })
            },
            datatype: "json"
        });
    }
}

/**
 * Initialising the JQueryUI elements
 */
$(function() {
    // Drop Down Menu
    if ($("#testselect").length) {
        $("#testselect").selectmenu({
            change: function(event, data) {
                displayOverallTestResults(data);
            }
        });
    }

    // Accordion
    $("#accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
        beforeActivate: function(event, ui) {
            // Clear the old section
            $(ui.oldHeader[0]).next().html("");

            // If user is not collapsing the accordion
            if (ui.newHeader[0] !== undefined) {
                // Load opened section
                $(ui.newHeader[0]).next().html('<p class="loading">' +
                '<i class="fa fa-circle-o-notch fa-spin fa-3x"></i><br/><br/>Retrieving results...</p>');

                var testID = $(ui.newHeader[0]).attr("testid");
                var studentID = $(ui.newHeader[0]).attr("studentid");
                $.ajax({
                    url: "/testplaza/php/getstudentresults.php?testID=" + testID + "&studentID=" + studentID,
                    success: function (data) {
                        displayStudentResults(data, ui);
                    }
                });
            }
        }
    });
});

/**
 * Scroll function - activated as user scrolls page
 */
$(window).scroll(function(){
    // Fades the opacity of the header as the user scrolls
    var fromtop = $(document).scrollTop();
    if (fromtop < 100) {
        fromtop = fromtop/1000;
        $("header").css('opacity', (1-fromtop));
    }
});

/**
 * Logout function - redirects the user to the logout script
 */
function logout() {
    // Ask the user to confirm they want to logout
    var r = confirm("Are you sure you want to logout?");
    if (r == true) {
        // redirect the user to the logout script
        window.location.assign("logout.php");
    }
}
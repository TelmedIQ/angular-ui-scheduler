(function(module) {
try { module = angular.module("angular-ui-scheduler"); }
catch(err) { module = angular.module("angular-ui-scheduler", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("angular-ui-scheduler/src/angular-scheduler-detail.html",
    "<div id=\"scheduler-detail\">\n" +
    "    <div class=\"alert alert-danger\" ng-show=\"!schedulerIsValid\">\n" +
    "        <p>The scheduler options are invalid or incomplete. Make the needed changes on the options tab, then come back here to see details.</p>\n" +
    "    </div>\n" +
    "    <div ng-show=\"schedulerIsValid\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label>Description</label>\n" +
    "            <textarea ng-model=\"rrule_nlp_description\" name=\"rrule_nlp_description\" id=\"rrule_nlp_description\" readonly class=\"form-control\" rows=\"2\"></textarea>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-show=\"showRRule\">\n" +
    "            <label>RRule</label>\n" +
    "            <textarea ng-model=\"rrule\" name=\"rrule\" id=\"rrule\" readonly class=\"form-control\" rows=\"3\"></textarea>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label id=\"occurrences-label\">Occurrences <span class=\"sublabel\">(limited to first 10)</label>\n" +
    "            <div id=\"date-choice\">\n" +
    "                <label class=\"label-inline\">Date format</label>\n" +
    "                <label class=\"radio-inline\"><input type=\"radio\" ng-model=\"dateChoice\" id=\"date-choice-local\" value=\"local\" >Local time</label>\n" +
    "                <label class=\"radio-inline\"><input type=\"radio\" ng-model=\"dateChoice\" id=\"date-choice-utc\" value=\"utc\" >UTC</label>\n" +
    "            </div>\n" +
    "            <ul class=\"occurrence-list mono-space\" ng-show=\"dateChoice == 'utc'\">\n" +
    "                <li ng-repeat=\"occurrence in occurrence_list\">{{ occurrence.utc }}</li>\n" +
    "            </ul>\n" +
    "            <ul class=\"occurrence-list mono-space\" ng-show=\"dateChoice == 'local'\">\n" +
    "                <li ng-repeat=\"occurrence in occurrence_list\">{{ occurrence.local }}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("angular-ui-scheduler"); }
catch(err) { module = angular.module("angular-ui-scheduler", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("angular-ui-scheduler/src/angularUiScheduler.html",
    "<div class=\"row angular-ui-scheduler\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "\n" +
    "        <form class=\"form\" role=\"form\" name=\"scheduler_form\" novalidate>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label><span class=\"red-text\">*</span> Name</label>\n" +
    "                <input type=\"text\" class=\"form-control \" name=\"schedulerName\" id=\"schedulerName\" ng-model=\"schedulerName\" required placeholder=\"Schedule name\">\n" +
    "                <div class=\"error\" ng-show=\"scheduler_form.schedulerName.$dirty && scheduler_form.schedulerName.$error.required\">Schedule name is required</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-5\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label><span class=\"red-text\">*</span> Start Date <span class=\"fmt-help\"> mm/dd/yyyy</span></label>\n" +
    "                        <input type=\"date\" class=\"form-control \" name=\"schedulerStartDt\" id=\"schedulerStartDt\" ng-model=\"schedulerStartDt\" placeholder=\"mm/dd/yyyy\" required\n" +
    "                               ng-change=\"scheduleTimeChange()\">\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-7\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label><span class=\"red-text\">*</span> Start Time <span class=\"fmt-help\">HH24:MM:SS</span><span class=\"fmt-help\" ng-show=\"!schedulerShowTimeZone\">UTC</span></label>\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <input name=\"schedulerStartHour\" id=\"schedulerStartHour\" type=\"number\" class=\"scheduler-time-spinner\"\n" +
    "                                   ng-model=\"schedulerStartHour\" placeholder=\"HH24\" min=\"0\" max=\"23\" required\n" +
    "                                   ng-change=\"scheduleTimeChange()\">\n" +
    "                            <span>:</span><input name=\"schedulerStartMinute\" id=\"schedulerStartMinute\" type=\"number\" class=\"scheduler-time-spinner\" ng-model=\"schedulerStartMinute\" placeholder=\"MM\"\n" +
    "                                                 min=\"0\" max=\"59\" required ng-change=\"scheduleTimeChange()\">\n" +
    "                            <span>:</span><input name=\"schedulerStartSecond\" id=\"schedulerStartSecond\" type=\"number\" class=\"scheduler-time-spinner\" ng-model=\"schedulerStartSecond\" placeholder=\"SS\"\n" +
    "                                                 min=\"0\" max=\"59\" required ng-change=\"scheduleTimeChange()\">\n" +
    "                        </div>\n" +
    "                        <div class=\"error\" ng-show=\"scheduler_startTime_error\">Time must be in HH24:MM:SS format</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row error-pull-up\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"error\" ng-show=\"scheduler_form_schedulerStartDt_error\" ng-bind=\"scheduler_form_schedulerStartDt_error\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-4\" ng-show=\"schedulerShowTimeZone\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Local Time Zone</label>\n" +
    "                        <select name=\"schedulerTimeZone\" id=\"schedulerTimeZone\" ng-model=\"schedulerTimeZone\" ng-options=\"z.name for z in timeZones\"\n" +
    "                                required class=\"form-control \" ng-change=\"scheduleTimeChange()\"></select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\" ng-show=\"schedulerShowUTCStartTime\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>UTC Start Time</label>\n" +
    "                        <input type=\"text\" name=\"schedulerUTCTime\" ng-model=\"schedulerUTCTime\" id=\"schedulerUTCTime\" class=\"form-control \" readonly>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label>Repeat frequency</label>\n" +
    "                        <select name=\"schedulerFrequency\" id=\"schedulerFrequency\" ng-model=\"schedulerFrequency\"\n" +
    "                                ng-options=\"f.name for f in frequencyOptions\" required class=\"form-control \"\n" +
    "                                ng-change=\"scheduleRepeatChange()\"></select>\n" +
    "                    </div>\n" +
    "                    <div class=\"error\" ng-show=\"sheduler_frequency_error\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group no-label\" ng-show=\"schedulerShowInterval\">\n" +
    "                        <label>Every</label>\n" +
    "                        <input name=\"schedulerInterval\" id=\"schedulerInterval\" type=\"number\" class=\"scheduler-spinner\"\n" +
    "                               ng-model=\"schedulerInterval\" min=\"1\" max=\"999\" ng-change=\"resetError('scheduler_interval_error')\">\n" +
    "                        <label class=\"inline-label\" ng-bind=\"schedulerIntervalLabel\"></label>\n" +
    "                        <div class=\"error\" ng-show=\"scheduler_interval_error\">Provide a value between 1 and 999</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\" ng-show=\"schedulerFrequency && schedulerFrequency.value == 'monthly'\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"form-group option-pad-left\">\n" +
    "                        <div class=\"radio col-md-2\">\n" +
    "                            <label><input type=\"radio\" value=\"day\" ng-model=\"monthlyRepeatOption\" ng-change=\"monthlyRepeatChange()\" name=\"monthlyRepeatOption\"\n" +
    "                                          id=\"monthlyRepeatOption\"> on day</label>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-3\" style=\"padding-top:5px\">\n" +
    "                            <input name=\"monthDay\" id=\"monthDay\" type=\"number\" class=\"scheduler-spinner\"\n" +
    "                                   ng-model=\"monthDay\" min=\"1\" max=\"31\" ng-change=\"resetError('scheduler_monthDay_error')\">\n" +
    "                            <div class=\"error\" ng-show=\"scheduler_monthDay_error\">Must be between 1 and 31</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row option-pad-bottom\" ng-show=\"schedulerFrequency && schedulerFrequency.value == 'monthly'\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"form-group option-pad-left\">\n" +
    "                        <div class=\"radio col-md-2\">\n" +
    "                            <label><input type=\"radio\" value=\"other\" ng-model=\"monthlyRepeatOption\" ng-change=\"monthlyRepeatChange()\" name=\"monthlyRepeatOption\" id=\"monthlyRepeatOption\"> on\n" +
    "                                the</label>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-3\">\n" +
    "                            <select name=\"monthlyOccurrence\" id=\"monthlyOccurrence\" ng-model=\"monthlyOccurrence\" ng-options=\"o.name for o in occurrences\"\n" +
    "                                    ng-disabled=\"monthlyRepeatOption != 'other'\" class=\"form-control \"></select>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-3\">\n" +
    "                            <select name=\"monthlyWeekDay\" id=\"monthlyWeekDay\" ng-model=\"monthlyWeekDay\" ng-options=\"w.name for w in weekdays\"\n" +
    "                                    ng-disabled=\"monthlyRepeatOption != 'other'\" class=\"form-control \"></select>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\" ng-show=\"schedulerFrequency && schedulerFrequency.value == 'yearly'\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"form-group option-pad-left\">\n" +
    "                        <div class=\"radio col-md-2\">\n" +
    "                            <label><input type=\"radio\" value=\"month\" ng-model=\"yearlyRepeatOption\" ng-change=\"yearlyRepeatChange()\" name=\"yearlyRepeatOption\" id=\"yearlyRepeatOption\"> on</label>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-3 padding-top-slim\">\n" +
    "                            <select name=\"yearlyMonth\" id=\"yearlyMonth\" ng-model=\"yearlyMonth\" ng-options=\"m.name for m in months\"\n" +
    "                                    ng-disabled=\"yearlyRepeatOption != 'month'\" class=\"form-control \"></select>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-3 padding-top-slim\">\n" +
    "                            <input name=\"yearlyMonthDay\" id=\"yearlyMonthDay\" type=\"number\" class=\"scheduler-spinner\"\n" +
    "                                   ng-model=\"yearlyMonthDay\" min=\"1\" max=\"31\" ng-change=\"resetError('scheduler_yearlyMonthDay_error')\">\n" +
    "                            <div class=\"error\" ng-show=\"scheduler_yearlyMonthDay_error\">Must be between 1 and 31</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row option-pad-bottom\" ng-show=\"schedulerFrequency && schedulerFrequency.value == 'yearly'\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"form-group option-pad-left\">\n" +
    "                        <div class=\"radio col-md-2\">\n" +
    "                            <label><input type=\"radio\" value=\"other\" ng-model=\"yearlyRepeatOption\" ng-change=\"yearlyRepeatChange()\" name=\"yearlyRepeatOption\"\n" +
    "                                          id=\"yearlyRepeatOption\"> on the</label>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-2 padding-top-slim\">\n" +
    "                            <select name=\"yearlyOccurrence\" id=\"yearlyOccurrence\" ng-model=\"yearlyOccurrence\" ng-options=\"o.name for o in occurrences\"\n" +
    "                                    ng-disabled=\"yearlyRepeatOption != 'other'\" class=\"form-control \"></select>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-2 padding-top-slim\">\n" +
    "                            <select name=\"yearlyWeekDay\" id=\"yearlyWeekDay\" ng-model=\"yearlyWeekDay\" ng-options=\"w.name for w in weekdays\"\n" +
    "                                    ng-disabled=\"yearlyRepeatOption != 'other'\" class=\"form-control \"></select>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-2 padding-top-slim\">\n" +
    "                            <select name=\"yearlyOtherMonth\" id=\"yearlyOtherMonth\" ng-model=\"yearlyOtherMonth\" ng-options=\"m.name for m in months\"\n" +
    "                                    ng-disabled=\"yearlyRepeatOption != 'other'\" class=\"form-control \"></select>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group option-pad-left option-pad-bottom\" ng-show=\"schedulerFrequency && schedulerFrequency.value == 'weekly'\">\n" +
    "                <label><span class=\"red-text\">*</span> On Days</label>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <div class=\"btn-group\" data-toggle=\"buttons-checkbox\" id=\"weekdaySelect\">\n" +
    "                        <button type=\"button\" ng-class=\"weekDaySUClass\" class=\"btn btn-default\" data-value=\"SU\" ng-click=\"setWeekday($event,'su')\">Sun</button>\n" +
    "                        <button type=\"button\" ng-class=\"weekDayMOClass\" class=\"btn btn-default\" data-value=\"MO\" ng-click=\"setWeekday($event,'mo')\">Mon</button>\n" +
    "                        <button type=\"button\" ng-class=\"weekDayTUClass\" class=\"btn btn-default\" data-value=\"TU\" ng-click=\"setWeekday($event,'tu')\">Tue</button>\n" +
    "                        <button type=\"button\" ng-class=\"weekDayWEClass\" class=\"btn btn-default\" data-value=\"WE\" ng-click=\"setWeekday($event,'we')\">Wed</button>\n" +
    "                        <button type=\"button\" ng-class=\"weekDayTHClass\" class=\"btn btn-default\" data-value=\"TH\" ng-click=\"setWeekday($event,'th')\">Thu</button>\n" +
    "                        <button type=\"button\" ng-class=\"weekDayFRClass\" class=\"btn btn-default\" data-value=\"FR\" ng-click=\"setWeekday($event,'fr')\">Fri</button>\n" +
    "                        <button type=\"button\" ng-class=\"weekDaySAClass\" class=\"btn btn-default\" data-value=\"SA\" ng-click=\"setWeekday($event,'sa')\">Sat</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"error\" ng-show=\"scheduler_weekDays_error\">Select one or more days</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <div class=\"form-group\" ng-show=\"schedulerShowInterval\">\n" +
    "                        <label>End</label>\n" +
    "                        <div>\n" +
    "                            <select id=\"schedulerEnd\" name=\"schedulerEnd\" ng-model=\"schedulerEnd\" ng-options=\"e.name for e in endOptions\" required class=\"form-control \"\n" +
    "                                    ng-change=\"schedulerEndChange()\"></select>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\" ng-show=\"schedulerEnd && schedulerEnd.value == 'after'\">\n" +
    "                    <div class=\"form-group no-label\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <input type=\"number\" ng-name=\"schedulerOccurrenceCount\" ng-id=\"schedulerOccurrenceCount\" class=\"scheduler-spinner\"\n" +
    "                                   ng-model=\"schedulerOccurrenceCount\" min=\"1\" max=\"999\" on-change=\"resetError('scheduler_occurrenceCount_error')\">\n" +
    "                            <label class=\"inline-label\">Occurrence(s)</label>\n" +
    "                        </div>\n" +
    "                        <div class=\"error\" ng-show=\"scheduler_occurrenceCount_error\">Provide a value between 1 and 999</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\" ng-show=\"schedulerEnd && schedulerEnd.value == 'on'\">\n" +
    "                    <div class=\"form-group no-label\">\n" +
    "\n" +
    "                        <input type=\"date\" name=\"schedulerEndDt\" id=\"schedulerEndDt\" class=\"form-control \" ng-model=\"schedulerEndDt\" data-min-today=\"true\" placeholder=\"mm/dd/yyyy\"\n" +
    "                               ng-change=\"resetError('scheduler_endDt_error')\">\n" +
    "\n" +
    "                        <div class=\"error\" ng-show=\"scheduler_endDt_error\">Provide a valid date</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "        <div id=\"scheduler-buttons\" style=\"display:none;\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" id=\"reset-button\" ng-click=\"resetForm()\"><i class=\"fa fa-undo\"></i> Reset</button>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"save-button\" ng-click=\"saveForm()\"><i class=\"fa fa-check\"></i> Save</button>\n" +
    "        </div>\n" +
    "\n" +
    "    </div><!-- col-md-12 -->\n" +
    "</div><!-- row -->\n" +
    "");
}]);
})();

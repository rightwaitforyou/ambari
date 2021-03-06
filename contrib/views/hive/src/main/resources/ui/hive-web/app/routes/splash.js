/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.Object.create({
      hdfsTest: null,
      hdfsTestDone: null,
      hiveserverTest: null,
      hiveserverTestDone: null,
      atsTest: null,
      atsTestDone: null,
      percent: 0
    });
  },

  setupController: function(controller, model) {

    if (!model) {
      return;
    }

    controller.set('model', model);
    var self = this;
    controller.startTests().then(function() {

    if (model.get("hiveserverTest") && model.get("hdfsTest") && model.get("atsTest")) {
      Ember.run.later(this, function() {
        self.send('transition');
      }, 2000);
    }
    });
  },

  actions: {
    transition: function() {
      this.transitionTo('index');
    }
  }

});

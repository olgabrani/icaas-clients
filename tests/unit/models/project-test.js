import { moduleForModel, test } from 'ember-qunit';

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('correct human name for System project', function(assert) {
  var model = this.subject({'system_project': true, 'name': 'test-name'});
  assert.equal(model.get('human_name'), 'System project');
});

test('correct human name for non System Project', function(assert) {
  var model = this.subject({'system_project': false, 'name': 'test-name'});
  assert.equal(model.get('human_name'), 'test-name');
});

test('negative free properties are always set to 0', function(assert) {
  var model = this.subject({
    'vm_project_usage': 3, 
    'vm_user_usage': 5,
    'vm_user_limit': -1,
    'vm_project_limit': 3,
  });
  assert.equal(model.get('vm_taken_by_others'), 0, 'no negative value for vm_taken_by_others');
  assert.equal(model.get('vm_effective_limit'), 0, 'no negative value for vm_effective_limit');
  assert.equal(model.get('vm_free'), 0, 'no negative value for vm_free');
});

test('correct calculated vm calculated properties', function(assert) {
  var model = this.subject({
    'vm_project_usage': 4, 
    'vm_user_usage': 2,
    'vm_user_limit': 4,
    'vm_project_limit': 8,
  });
  assert.equal(model.get('vm_taken_by_others'), 2, 'correct vm_taken_by_others');
  assert.equal(model.get('vm_effective_limit'), 4, 'correct vm effective limit');
  assert.equal(model.get('vm_free'), 2, 'correct vm free');
});

require "test_helper"

class CharacterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "coordinates array is being validated" do
    valid_coordinates = Character.new(name: "Waldo", coordinates: [10, 22, 35, 42])
    assert valid_coordinates.save

    too_short_coordinates Character.new(name: "Wald", coordinates: [10, 22])
    assert_not too_short_coordinates.save

    too_long_coordinates = Character.new(name: "Waldooo", coordinates: [10, 22, 35, 42, 122, 15])
    assert_not too_long_coordinates.save

    not_array_coordinates = Character.new(name: "waldo", coordinates: 1)
    assert_not not_array_coordinates.save
  end
end

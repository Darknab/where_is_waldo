require "test_helper"

class Api::ImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_images_show_url
    assert_response :success
  end
end

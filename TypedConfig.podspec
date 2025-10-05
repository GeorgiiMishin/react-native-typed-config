require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "TypedConfig"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => ".git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp}"
  s.private_header_files = "ios/**/*.h"

  config_mapping = defined?($typed_config_mapping) ? $typed_config_mapping : {
    # "Debug" => '.env.debug.json',
    # "Release" => '.env.production.json'
  }

  s.script_phases = [
    {
      :name => 'Generate Env config',
      :script => <<-SCRIPT,
cd "${PODS_TARGET_SRCROOT}"

export CONFIG_MAPPING='#{config_mapping.to_json}'

node "./scripts/generateIosConfig.js" "${CONFIGURATION}"
SCRIPT
      :execution_position => :before_headers
    }
  ]

  install_modules_dependencies(s)
end

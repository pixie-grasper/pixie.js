# Authors: pixie-grasper
# License: MIT

task :default => :build

def indent(line, depth)
  if line.length == 0 then ''
  elsif line =~ /^( *)(\/\* *global .*)$/ then ' ' * depth + $1 + '// ' + $2
  else ' ' * depth + line
  end
end

task :build do
  `mkdir -p build`
  File.open('build/pixie.js', 'w') do |file|
    file.write <<-EOJ
// Authors: pixie-grasper
// License: MIT

window.$ = (function() {
    EOJ

    `find ./src/constants/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ
  const #{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        indent line, 4
      }.join($/))
      file.write <<-EOJ

  })();

      EOJ
    end

    `find ./src/privates/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ
  let #{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        indent line, 4
      }.join($/))
      file.write <<-EOJ

  })();

      EOJ
    end

    `find ./src/statics/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ
  pixie.#{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        indent line, 4
      }.join($/))
      file.write <<-EOJ

  })();

      EOJ
    end

    file.write <<-EOJ
  pixie.prototype = {};

    EOJ

    `find ./src/methods/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ
  pixie.prototype.#{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        indent line, 4
      }.join($/))
      file.write <<-EOJ

  })();

      EOJ
    end

    file.write <<-EOJ
  pixie(__initialize__);

  return pixie;
})();
      EOJ
  end
end

task :release => :build
task :release do
  `java -jar external/closure/closure-compiler-v20161024.jar --js_output_file build/pixie.min.js build/pixie.js`
end

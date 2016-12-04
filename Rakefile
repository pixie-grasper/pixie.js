# Authors: pixie-grasper
# License: MIT

task :default => :build

task :build do
  `mkdir -p build`
  File.open('build/pixie.js', 'w') do |file|
    file.write <<-EOJ
// Authors: pixie-grasper
// License: MIT

window.$ = (function() {
    EOJ

    `find ./src/privates/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ
  let #{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        if line.length == 0 then ''
        elsif line =~ /^( *)(\/\* *global .*)$/ then ' ' * 4 + $1 + '// ' + $2
        else ' ' * 4 + line
        end
      }.join($/))
      file.write <<-EOJ

  })();

      EOJ
    end

    `find ./src/events/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ
  window.on#{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        if line.length == 0 then ''
        elsif line =~ /^( *)(\/\* *global .*)$/ then ' ' * 4 + $1 + '// ' + $2
        else ' ' * 4 + line
        end
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
        if line.length == 0 then ''
        elsif line =~ /^( *)(\/\* *global .*)$/ then ' ' * 4 + $1 + '// ' + $2
        else ' ' * 4 + line
        end
      }.join($/))
      file.write <<-EOJ

  })();

      EOJ
    end

    file.write <<-EOJ
  const Pixie = function(elements) {
    (function(this_) {
      Object.keys(elements).forEach(function(key) {
        this_[key] = elements[key];
      });
      pixie.extend(true, this_.__proto__, pixie.prototype);
    })(this);
    this.length = elements.length;
  };
    EOJ

    `find ./src/methods/ -name '*.js'`.split($/).each do |path|
      next if File.basename(path) =~ /^\./
      basename = File.basename path, '.js'
      file.write <<-EOJ

  pixie.prototype.#{basename} = (function() {
      EOJ
      file.write(File.open(path).read.split($/).collect{ |line|
        if line.length == 0 then ''
        elsif line =~ /^( *)(\/\* *global .*)$/ then ' ' * 4 + $1 + '// ' + $2
        else ' ' * 4 + line
        end
      }.join($/))
      file.write <<-EOJ

  }).call(this);
      EOJ
    end

    file.write <<-EOJ

  return pixie;
})();
      EOJ
  end
end

task :release => :build
task :release do
  `java -jar external/closure/closure-compiler-v20161024.jar --js_output_file build/pixie.min.js build/pixie.js`
end

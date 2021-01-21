
#include <algorithm>
#include <iostream>
#include <fstream>

// Examples:
// 1-3 a: abcde
// 1-3 b: cdefg   <-- INVALID
// 2-9 c: ccccccccc

struct password_line {
  int min;
  int max;
  char required;
  std::string password;
};

bool is_valid(const password_line& line) {
  int count = 0;
  for (std::size_t i = 0; i < line.password.size(); ++i) {
    if (line.password.at(i) == line.required) {
      ++count;
      if (count > line.max) return false;
    }
  }
  return count >= line.min;
}

int main(int argc, char* argv[]) {
  std::ifstream input{argv[1]};
  int valid = 0;
  int invalid = 0;
  password_line line;
  char c;
  while (
    (
      input >> line.min >> c >> line.max >> line.required >> c >> line.password
    ).good()
  ) {
    if (is_valid(line)) ++valid;
    else ++invalid;
  }

  std::cout << "valid: " << valid << "; invalid: " << invalid << std::endl;
}

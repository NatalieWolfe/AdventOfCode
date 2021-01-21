
#include <algorithm>
#include <iostream>
#include <fstream>

// Examples:
// 1-3 a: abcde
// 1-3 b: cdefg   <-- INVALID
// 2-9 c: ccccccccc

struct password_line {
  int pos1;
  int pos2;
  char required;
  std::string password;
};

bool is_valid(const password_line& line) {
  int count = 0;
  if (line.password.at(line.pos1 - 1) == line.required) ++count;
  if (line.password.at(line.pos2 - 1) == line.required) ++count;
  return count == 1;
}

int main(int argc, char* argv[]) {
  std::ifstream input{argv[1]};
  int valid = 0;
  int invalid = 0;
  password_line line;
  char c;
  while (
    (
      input >> line.pos1 >> c >> line.pos2 >> line.required >> c >> line.password
    ).good()
  ) {
    if (is_valid(line)) ++valid;
    else ++invalid;
  }

  std::cout << "valid: " << valid << "; invalid: " << invalid << std::endl;
}

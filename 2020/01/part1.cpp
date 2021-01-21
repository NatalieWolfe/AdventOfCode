
#include <algorithm>
#include <iostream>
#include <fstream>
#include <vector>

int main(int argc, char* argv[]) {
  std::ifstream input{argv[1]};
  std::vector<int> entries;
  while (input.good()) {
    int n;
    input >> n;
    entries.push_back(n);
  }

  std::sort(entries.begin(), entries.end());

  auto low = entries.begin();
  auto high = entries.end() - 1;
  const int target = 2020;

  while (low < high && (*low + *high) != target) {
    if (*low + *high > target) --high;
    else ++low;
  }

  std::cout << *low << " * " << *high << " = " << (*low * *high) << std::endl;
}

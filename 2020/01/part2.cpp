
#include <algorithm>
#include <iostream>
#include <fstream>
#include <utility>
#include <vector>

template <typename Itr>
std::pair<Itr, Itr> find_sum(int target, Itr low, Itr high) {
  while (low < high && (*low + *high) != target) {
    if (*low + *high > target) --high;
    else ++low;
  }
  return {low, high};
}

int main(int argc, char* argv[]) {
  std::ifstream input{argv[1]};
  std::vector<int> entries;
  while (input.good()) {
    int n;
    input >> n;
    entries.push_back(n);
  }

  std::sort(entries.begin(), entries.end());

  const int target = 2020;
  auto low = entries.begin();
  auto high = entries.end() - 1;
  auto mid = high - 1;

  while (low < mid && mid < high) {
    auto [a, b] = find_sum(target - *high, low, mid);
    int sum = *a + *b + *high;
    if (sum == target) {
      low = a;
      mid = b;
      break;
    } else {
      --mid;
      --high;
    }
  }

  std::cout
    << *low << " * " << *mid << " * " << *high << " = "
    << (*low * *mid * *high) << std::endl;
}

using namespace std
#include <annuaire.c>

struct Person{
  string first-_name,last_name;
};
class Reverse_telephon_dictionnary{
  public:
      pair<Person,bool>find(int number);
      void insert(int number,Person person);
  private:
      map<int,Person>dir;
};

struct Directed_graph{
  vector<vector<Arc>>adj;
}

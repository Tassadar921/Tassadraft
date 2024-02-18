import GithubLabel from './github/GithubLabel';

export default class Label {

  public name: string;
  public color: string;
  public description: string;

  constructor(githubLabel: GithubLabel) {
    this.name = githubLabel.name;
    this.color = githubLabel.color;
    this.description = githubLabel.description;
  }
}

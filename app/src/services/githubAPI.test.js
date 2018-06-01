jest.mock('./request', () => ({
  getCORS: jest.fn(() => Promise.resolve({}))
}));

import { findLibraries, getRepoContent, getRepos, findLanguages, getPackageJson } from './githubAPI';
import { getCORS } from './request';
import 'isomorphic-fetch';

describe('languages and libraries async spec', () => {
  
  const repos = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' }
  ];

  const mockResponse = (status, statusText, response) => {
    return new Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  it('returns repositories', async() => {
    const fakePromise = Promise.resolve(mockResponse(200, null, repos));

    getCORS.mockReturnValueOnce(Promise.resolve(fakePromise));

    const result = await getRepos();
    
    expect.assertions(1);

    expect(result.body).toBe(repos);
  });
  
  it('catches an error', async() => {
    const fakePromise = Promise.resolve(mockResponse(400, 'failed', 'this was an error'));

    //for getRepos
    getCORS.mockReturnValueOnce(Promise.reject(fakePromise));

    //for getRepoContent
    getCORS.mockReturnValueOnce(Promise.reject(fakePromise));

    //forPackageJson
    getCORS.mockReturnValueOnce(Promise.reject(fakePromise));

    const result1 = await getRepos();
    const result2 = await getRepoContent();
    const result3 = await getPackageJson();
    
    expect.assertions(3);
    //undefined as it is console.log
    expect(result1).toBe(undefined);
    expect(result2).toBe(undefined);
    expect(result3).toBe(undefined);
  });

  it('finds libraries', async() => {
    const listWithPackage = { 
      tree: [{
        'path': 'ServerSide/package-lock.json',
        'mode': '100644',
        'type': 'blob',
        'sha': '1a5db2ebf5282303342f61a8ca3dff56954582c8',
        'size': 21235,
        'url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs/1a5db2ebf5282303342f61a8ca3dff56954582c8'
      },
      {
        'path': 'ServerSide/package.json',
        'mode': '100644',
        'type': 'blob',
        'sha': '1d8739fce6ed7b903070b6f6bedf38e94ade2aa9',
        'size': 417,
        'url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs/1d8739fce6ed7b903070b6f6bedf38e94ade2aa9'
      },
      {
        'path': 'ServerSide/schema.sql',
        'mode': '100644',
        'type': 'blob',
        'sha': 'c50f7a443d7634034292ce5dfeafc6001f5a7737',
        'size': 321,
        'url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs/c50f7a443d7634034292ce5dfeafc6001f5a7737'
      }] 
    };
    const base64 = {
      'sha': '83a6c84ed3559731091070f168ff64e77f150bb2',
      'size': 1174,
      'url': 'https://api.github.com/repos/Theartbug/TradePDX/git/blobs/83a6c84ed3559731091070f168ff64e77f150bb2',
      'content': 'ewogICJuYW1lIjogIlRyYWRlUERYIiwKICAidmVyc2lvbiI6ICIxLjAuMCIs\nCiAgImRlc2NyaXB0aW9uIjogIiIsCiAgIm1haW4iOiAiaW5kZXguanMiLAog\nICJzY3JpcHRzIjogewogICAgImxpbnQiOiAiZXNsaW50IHNyYyIsCiAgICAi\naHRtbGhpbnQiOiAiaHRtbGhpbnQgLS1jb25maWcgLmh0bWxoaW50cmMgKiov\nKi5odG1sIiwKICAgICJwcmV0ZXN0IjogIm5wbSBydW4gbGludCAmJiBucG0g\ncnVuIGh0bWxoaW50IiwKICAgICJ0ZXN0IjogImVjaG8gXCJFcnJvcjogbm8g\ndGVzdHMgeWV0IVwiICYmIGV4aXQgMCIsCiAgICAic3RhcnQiOiAid2VicGFj\nay1kZXYtc2VydmVyIiwKICAgICJidWlsZCI6ICJ3ZWJwYWNrIC0tY29uZmln\nIHdlYnBhY2sucHJvZC5qcyIsCiAgICAiZGVwbG95IjogImZpcmViYXNlIGRl\ncGxveSIKICB9LAogICJhdXRob3IiOiAiR3JhY2UgUHJvdm9zdCIsCiAgImxp\nY2Vuc2UiOiAiSVNDIiwKICAiZGV2RGVwZW5kZW5jaWVzIjogewogICAgImF1\ndG9wcmVmaXhlciI6ICJeNy4yLjQiLAogICAgImNsZWFuLXdlYnBhY2stcGx1\nZ2luIjogIl4wLjEuMTgiLAogICAgImNvcHktd2VicGFjay1wbHVnaW4iOiAi\nXjQuMy4xIiwKICAgICJjc3MtbG9hZGVyIjogIl4wLjI4LjgiLAogICAgImRv\ndGVudiI6ICJeNS4wLjAiLAogICAgImVzbGludCI6ICJeNC4xNS4wIiwKICAg\nICJleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iOiAiXjMuMC4yIiwKICAg\nICJmaWxlLWxvYWRlciI6ICJeMS4xLjYiLAogICAgImh0bWwtbG9hZGVyIjog\nIl4wLjUuNCIsCiAgICAiaHRtbC13ZWJwYWNrLXBsdWdpbiI6ICJeMi4zMC4x\nIiwKICAgICJodG1saGludCI6ICJeMC45LjEzIiwKICAgICJwb3N0Y3NzLWxv\nYWRlciI6ICJeMi4wLjEwIiwKICAgICJwcmVjc3MiOiAiXjIuMC4wIiwKICAg\nICJzdHlsZS1sb2FkZXIiOiAiXjAuMTkuMSIsCiAgICAidWdsaWZ5anMtd2Vi\ncGFjay1wbHVnaW4iOiAiXjEuMS44IiwKICAgICJ1cmwtbG9hZGVyIjogIl4w\nLjYuMiIsCiAgICAid2VicGFjayI6ICJeMy4xMC4wIiwKICAgICJ3ZWJwYWNr\nLWRldi1zZXJ2ZXIiOiAiXjIuMTAuMCIsCiAgICAid2VicGFjay1tZXJnZSI6\nICJeNC4xLjEiCiAgfSwKICAiZGVwZW5kZW5jaWVzIjogewogICAgImZpcmVi\nYXNlIjogIl40LjkuMSIsCiAgICAiZmlyZWJhc2V1aSI6ICJeMi41LjEiCiAg\nfQp9Cg==\n',
      'encoding': 'base64'
    };
    const repo = [{
      'id': 116049040,
      'name': 'pokepersonality',
      'full_name': 'Theartbug/pokepersonality',
      'owner': {
        'login': 'Theartbug',
        'id': 26826831,
        'avatar_url': 'https://avatars0.githubusercontent.com/u/26826831?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/Theartbug',
        'html_url': 'https://github.com/Theartbug',
        'followers_url': 'https://api.github.com/users/Theartbug/followers',
        'following_url': 'https://api.github.com/users/Theartbug/following{/other_user}',
        'gists_url': 'https://api.github.com/users/Theartbug/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/Theartbug/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/Theartbug/subscriptions',
        'organizations_url': 'https://api.github.com/users/Theartbug/orgs',
        'repos_url': 'https://api.github.com/users/Theartbug/repos',
        'events_url': 'https://api.github.com/users/Theartbug/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/Theartbug/received_events',
        'type': 'User',
        'site_admin': false
      },
      'private': false,
      'html_url': 'https://github.com/Theartbug/pokepersonality',
      'description': null,
      'fork': false,
      'url': 'https://api.github.com/repos/Theartbug/pokepersonality',
      'forks_url': 'https://api.github.com/repos/Theartbug/pokepersonality/forks',
      'keys_url': 'https://api.github.com/repos/Theartbug/pokepersonality/keys{/key_id}',
      'collaborators_url': 'https://api.github.com/repos/Theartbug/pokepersonality/collaborators{/collaborator}',
      'teams_url': 'https://api.github.com/repos/Theartbug/pokepersonality/teams',
      'hooks_url': 'https://api.github.com/repos/Theartbug/pokepersonality/hooks',
      'issue_events_url': 'https://api.github.com/repos/Theartbug/pokepersonality/issues/events{/number}',
      'events_url': 'https://api.github.com/repos/Theartbug/pokepersonality/events',
      'assignees_url': 'https://api.github.com/repos/Theartbug/pokepersonality/assignees{/user}',
      'branches_url': 'https://api.github.com/repos/Theartbug/pokepersonality/branches{/branch}',
      'tags_url': 'https://api.github.com/repos/Theartbug/pokepersonality/tags',
      'blobs_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs{/sha}',
      'git_tags_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/tags{/sha}',
      'git_refs_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/refs{/sha}',
      'trees_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/trees{/sha}',
      'statuses_url': 'https://api.github.com/repos/Theartbug/pokepersonality/statuses/{sha}',
      'languages_url': 'https://api.github.com/repos/Theartbug/pokepersonality/languages',
      'stargazers_url': 'https://api.github.com/repos/Theartbug/pokepersonality/stargazers',
      'contributors_url': 'https://api.github.com/repos/Theartbug/pokepersonality/contributors',
      'subscribers_url': 'https://api.github.com/repos/Theartbug/pokepersonality/subscribers',
      'subscription_url': 'https://api.github.com/repos/Theartbug/pokepersonality/subscription',
      'commits_url': 'https://api.github.com/repos/Theartbug/pokepersonality/commits{/sha}',
      'git_commits_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/commits{/sha}',
      'comments_url': 'https://api.github.com/repos/Theartbug/pokepersonality/comments{/number}',
      'issue_comment_url': 'https://api.github.com/repos/Theartbug/pokepersonality/issues/comments{/number}',
      'contents_url': 'https://api.github.com/repos/Theartbug/pokepersonality/contents/{+path}',
      'compare_url': 'https://api.github.com/repos/Theartbug/pokepersonality/compare/{base}...{head}',
      'merges_url': 'https://api.github.com/repos/Theartbug/pokepersonality/merges',
      'archive_url': 'https://api.github.com/repos/Theartbug/pokepersonality/{archive_format}{/ref}',
      'downloads_url': 'https://api.github.com/repos/Theartbug/pokepersonality/downloads',
      'issues_url': 'https://api.github.com/repos/Theartbug/pokepersonality/issues{/number}',
      'pulls_url': 'https://api.github.com/repos/Theartbug/pokepersonality/pulls{/number}',
      'milestones_url': 'https://api.github.com/repos/Theartbug/pokepersonality/milestones{/number}',
      'notifications_url': 'https://api.github.com/repos/Theartbug/pokepersonality/notifications{?since,all,participating}',
      'labels_url': 'https://api.github.com/repos/Theartbug/pokepersonality/labels{/name}',
      'releases_url': 'https://api.github.com/repos/Theartbug/pokepersonality/releases{/id}',
      'deployments_url': 'https://api.github.com/repos/Theartbug/pokepersonality/deployments',
      'created_at': '2018-01-02T19:23:19Z',
      'updated_at': '2018-01-02T19:33:45Z',
      'pushed_at': '2018-01-08T03:22:58Z',
      'git_url': 'git://github.com/Theartbug/pokepersonality.git',
      'ssh_url': 'git@github.com:Theartbug/pokepersonality.git',
      'clone_url': 'https://github.com/Theartbug/pokepersonality.git',
      'svn_url': 'https://github.com/Theartbug/pokepersonality',
      'homepage': null,
      'size': 192,
      'stargazers_count': 0,
      'watchers_count': 0,
      'language': 'JavaScript',
      'has_issues': true,
      'has_projects': true,
      'has_downloads': true,
      'has_wiki': true,
      'has_pages': true,
      'forks_count': 0,
      'mirror_url': null,
      'archived': false,
      'open_issues_count': 0,
      'license': null,
      'forks': 0,
      'open_issues': 0,
      'watchers': 0,
      'default_branch': 'master'
    }];

    getCORS.mockReturnValueOnce(Promise.resolve(listWithPackage));

    getCORS.mockReturnValueOnce(Promise.resolve(base64));
    
    const result = await findLibraries(repo);

    expect(result).toEqual(
      { react: 0, webpack: 1, express: 0, redux: 0, firebase: 1, node: 1 });
    expect(getCORS).toHaveBeenCalledTimes(6);
  });
  it('does not find libraries', async() => {
    const listWithoutPackage = { 
      tree: [{
        'path': 'ServerSide/package-lock.json',
        'mode': '100644',
        'type': 'blob',
        'sha': '1a5db2ebf5282303342f61a8ca3dff56954582c8',
        'size': 21235,
        'url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs/1a5db2ebf5282303342f61a8ca3dff56954582c8'
      },
      {
        'path': 'ServerSide/schema.sql',
        'mode': '100644',
        'type': 'blob',
        'sha': 'c50f7a443d7634034292ce5dfeafc6001f5a7737',
        'size': 321,
        'url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs/c50f7a443d7634034292ce5dfeafc6001f5a7737'
      }] 
    };
    const repo = [{
      'id': 116049040,
      'name': 'pokepersonality',
      'full_name': 'Theartbug/pokepersonality',
      'owner': {
        'login': 'Theartbug',
        'id': 26826831,
        'avatar_url': 'https://avatars0.githubusercontent.com/u/26826831?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/Theartbug',
        'html_url': 'https://github.com/Theartbug',
        'followers_url': 'https://api.github.com/users/Theartbug/followers',
        'following_url': 'https://api.github.com/users/Theartbug/following{/other_user}',
        'gists_url': 'https://api.github.com/users/Theartbug/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/Theartbug/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/Theartbug/subscriptions',
        'organizations_url': 'https://api.github.com/users/Theartbug/orgs',
        'repos_url': 'https://api.github.com/users/Theartbug/repos',
        'events_url': 'https://api.github.com/users/Theartbug/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/Theartbug/received_events',
        'type': 'User',
        'site_admin': false
      },
      'private': false,
      'html_url': 'https://github.com/Theartbug/pokepersonality',
      'description': null,
      'fork': false,
      'url': 'https://api.github.com/repos/Theartbug/pokepersonality',
      'forks_url': 'https://api.github.com/repos/Theartbug/pokepersonality/forks',
      'keys_url': 'https://api.github.com/repos/Theartbug/pokepersonality/keys{/key_id}',
      'collaborators_url': 'https://api.github.com/repos/Theartbug/pokepersonality/collaborators{/collaborator}',
      'teams_url': 'https://api.github.com/repos/Theartbug/pokepersonality/teams',
      'hooks_url': 'https://api.github.com/repos/Theartbug/pokepersonality/hooks',
      'issue_events_url': 'https://api.github.com/repos/Theartbug/pokepersonality/issues/events{/number}',
      'events_url': 'https://api.github.com/repos/Theartbug/pokepersonality/events',
      'assignees_url': 'https://api.github.com/repos/Theartbug/pokepersonality/assignees{/user}',
      'branches_url': 'https://api.github.com/repos/Theartbug/pokepersonality/branches{/branch}',
      'tags_url': 'https://api.github.com/repos/Theartbug/pokepersonality/tags',
      'blobs_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/blobs{/sha}',
      'git_tags_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/tags{/sha}',
      'git_refs_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/refs{/sha}',
      'trees_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/trees{/sha}',
      'statuses_url': 'https://api.github.com/repos/Theartbug/pokepersonality/statuses/{sha}',
      'languages_url': 'https://api.github.com/repos/Theartbug/pokepersonality/languages',
      'stargazers_url': 'https://api.github.com/repos/Theartbug/pokepersonality/stargazers',
      'contributors_url': 'https://api.github.com/repos/Theartbug/pokepersonality/contributors',
      'subscribers_url': 'https://api.github.com/repos/Theartbug/pokepersonality/subscribers',
      'subscription_url': 'https://api.github.com/repos/Theartbug/pokepersonality/subscription',
      'commits_url': 'https://api.github.com/repos/Theartbug/pokepersonality/commits{/sha}',
      'git_commits_url': 'https://api.github.com/repos/Theartbug/pokepersonality/git/commits{/sha}',
      'comments_url': 'https://api.github.com/repos/Theartbug/pokepersonality/comments{/number}',
      'issue_comment_url': 'https://api.github.com/repos/Theartbug/pokepersonality/issues/comments{/number}',
      'contents_url': 'https://api.github.com/repos/Theartbug/pokepersonality/contents/{+path}',
      'compare_url': 'https://api.github.com/repos/Theartbug/pokepersonality/compare/{base}...{head}',
      'merges_url': 'https://api.github.com/repos/Theartbug/pokepersonality/merges',
      'archive_url': 'https://api.github.com/repos/Theartbug/pokepersonality/{archive_format}{/ref}',
      'downloads_url': 'https://api.github.com/repos/Theartbug/pokepersonality/downloads',
      'issues_url': 'https://api.github.com/repos/Theartbug/pokepersonality/issues{/number}',
      'pulls_url': 'https://api.github.com/repos/Theartbug/pokepersonality/pulls{/number}',
      'milestones_url': 'https://api.github.com/repos/Theartbug/pokepersonality/milestones{/number}',
      'notifications_url': 'https://api.github.com/repos/Theartbug/pokepersonality/notifications{?since,all,participating}',
      'labels_url': 'https://api.github.com/repos/Theartbug/pokepersonality/labels{/name}',
      'releases_url': 'https://api.github.com/repos/Theartbug/pokepersonality/releases{/id}',
      'deployments_url': 'https://api.github.com/repos/Theartbug/pokepersonality/deployments',
      'created_at': '2018-01-02T19:23:19Z',
      'updated_at': '2018-01-02T19:33:45Z',
      'pushed_at': '2018-01-08T03:22:58Z',
      'git_url': 'git://github.com/Theartbug/pokepersonality.git',
      'ssh_url': 'git@github.com:Theartbug/pokepersonality.git',
      'clone_url': 'https://github.com/Theartbug/pokepersonality.git',
      'svn_url': 'https://github.com/Theartbug/pokepersonality',
      'homepage': null,
      'size': 192,
      'stargazers_count': 0,
      'watchers_count': 0,
      'language': 'JavaScript',
      'has_issues': true,
      'has_projects': true,
      'has_downloads': true,
      'has_wiki': true,
      'has_pages': true,
      'forks_count': 0,
      'mirror_url': null,
      'archived': false,
      'open_issues_count': 0,
      'license': null,
      'forks': 0,
      'open_issues': 0,
      'watchers': 0,
      'default_branch': 'master'
    }];

    getCORS.mockReturnValueOnce(Promise.resolve(listWithoutPackage));

    const result = await findLibraries(repo);

    expect(result).toEqual(
      { react: 0, webpack: 0, express: 0, redux: 0, firebase: 0, node: 0 });
    expect(getCORS).toHaveBeenCalledTimes(7);
  });


});